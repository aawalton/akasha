import { afterEach, beforeEach, describe, expect, mock, spyOn, test } from "bun:test"
import {
  AUTO_TOOL_CHOICE,
  attemptForcedToolChoiceRewrite,
  FORCED_TOOL_CHOICE_MESSAGE_PREFIX,
  type ForcedToolChoiceArgs,
  isForcedToolChoiceRejection,
  rewrittenToAutoToolChoice,
} from "./forced-tool-choice.module.code.ts"

const REFUSAL = JSON.stringify({
  type: "error",
  error: {
    type: "invalid_request_error",
    message: `${FORCED_TOOL_CHOICE_MESSAGE_PREFIX} with thinking`,
  },
})

function bodyOf(value: unknown): ArrayBuffer {
  const bytes = new TextEncoder().encode(JSON.stringify(value))
  const out = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(out).set(bytes)
  return out
}

function readBack(buffer: ArrayBuffer): Record<string, unknown> {
  const parsed: unknown = JSON.parse(new TextDecoder().decode(buffer))
  if (parsed === null || typeof parsed !== "object") throw new Error("the rewrite was no object")
  return parsed as Record<string, unknown>
}

describe("reading the refusal", () => {
  test("a 400 naming the forced tool choice message is the refusal", () => {
    expect(isForcedToolChoiceRejection(400, REFUSAL)).toBe(true)
  })

  test("a status other than 400 is no refusal", () => {
    expect(isForcedToolChoiceRejection(429, REFUSAL)).toBe(false)
  })

  test("a body that is no json is no refusal", () => {
    expect(isForcedToolChoiceRejection(400, "{not json")).toBe(false)
  })

  test("a body carrying no error envelope is no refusal", () => {
    expect(isForcedToolChoiceRejection(400, JSON.stringify({ hello: "there" }))).toBe(false)
  })

  test("an error type other than invalid_request_error is no refusal", () => {
    const other = JSON.stringify({
      type: "error",
      error: { type: "rate_limit_error", message: FORCED_TOOL_CHOICE_MESSAGE_PREFIX },
    })
    expect(isForcedToolChoiceRejection(400, other)).toBe(false)
  })

  test("an invalid request naming another message is no refusal", () => {
    const other = JSON.stringify({
      type: "error",
      error: { type: "invalid_request_error", message: "max_tokens is too large" },
    })
    expect(isForcedToolChoiceRejection(400, other)).toBe(false)
  })

  test("an invalid request carrying no message is no refusal", () => {
    const other = JSON.stringify({ type: "error", error: { type: "invalid_request_error" } })
    expect(isForcedToolChoiceRejection(400, other)).toBe(false)
  })
})

describe("rewriting the tool choice", () => {
  test("a tool choice of `tool` is rewritten to auto", () => {
    const rewritten = rewrittenToAutoToolChoice(bodyOf({ tool_choice: { type: "tool" } }))
    if (rewritten === null) throw new Error("a forcing tool choice was rewritten nowhere")
    expect(readBack(rewritten).tool_choice).toEqual({ type: AUTO_TOOL_CHOICE })
  })

  test("a tool choice of `any` is rewritten to auto", () => {
    const rewritten = rewrittenToAutoToolChoice(bodyOf({ tool_choice: { type: "any" } }))
    if (rewritten === null) throw new Error("a forcing tool choice was rewritten nowhere")
    expect(readBack(rewritten).tool_choice).toEqual({ type: AUTO_TOOL_CHOICE })
  })

  test("a tool choice already auto is rewritten nowhere", () => {
    expect(rewrittenToAutoToolChoice(bodyOf({ tool_choice: { type: "auto" } }))).toBe(null)
  })

  test("a body naming no tool choice is rewritten nowhere", () => {
    expect(rewrittenToAutoToolChoice(bodyOf({ model: "claude-opus-5" }))).toBe(null)
  })

  test("a rewrite carries every other key of the body through", () => {
    const rewritten = rewrittenToAutoToolChoice(
      bodyOf({ tool_choice: { type: "tool", name: "grep" }, model: "claude-opus-5" })
    )
    if (rewritten === null) throw new Error("a forcing tool choice was rewritten nowhere")
    expect(readBack(rewritten).model).toBe("claude-opus-5")
  })

  test("a rewrite drops the tool the forced choice named", () => {
    const rewritten = rewrittenToAutoToolChoice(
      bodyOf({ tool_choice: { type: "tool", name: "grep" } })
    )
    if (rewritten === null) throw new Error("a forcing tool choice was rewritten nowhere")
    expect(readBack(rewritten).tool_choice).toEqual({ type: AUTO_TOOL_CHOICE })
  })
})

describe("attempting the rewrite", () => {
  const logs: { output: string[]; answered: Array<readonly [string, number]> } = {
    output: [],
    answered: [],
  }

  beforeEach(() => {
    logs.output = []
    logs.answered = []
    spyOn(console, "log").mockImplementation((...parts: unknown[]) => {
      logs.output.push(parts.map(String).join(" "))
    })
  })

  afterEach(() => {
    mock.restore()
  })

  function argsFor(overrides: Partial<ForcedToolChoiceArgs> = {}): ForcedToolChoiceArgs {
    return {
      res: new Response(REFUSAL, { status: 400, statusText: "Bad Request" }),
      bodyBuffer: bodyOf({ tool_choice: { type: "tool" }, model: "claude-opus-5" }),
      currentAccount: "alpha",
      trail: ["alpha"],
      method: "POST",
      pathname: "/v1/messages",
      logPrefix: "[gateway]",
      logRes: (account, status): undefined => {
        logs.answered.push([account, status])
      },
      ...overrides,
    }
  }

  test("a refusal on a forcing body is answered with a retry", async () => {
    const outcome = await attemptForcedToolChoiceRewrite(argsFor())
    expect(outcome.kind).toBe("retry")
  })

  test("a retry carries the body with the tool choice left to the model", async () => {
    const outcome = await attemptForcedToolChoiceRewrite(argsFor())
    if (outcome.kind !== "retry") throw new Error("the refusal was answered with no retry")
    expect(readBack(outcome.rewrittenBody).tool_choice).toEqual({ type: AUTO_TOOL_CHOICE })
  })

  test("a retry is written about", async () => {
    await attemptForcedToolChoiceRewrite(argsFor())
    expect(logs.output.join("\n")).toContain("forced-tool_choice observed account=alpha")
  })

  test("a body that is absent is answered unchanged", async () => {
    const outcome = await attemptForcedToolChoiceRewrite(argsFor({ bodyBuffer: null }))
    expect(outcome.kind).toBe("response")
  })

  test("a 400 that is no forced tool choice refusal is answered unchanged", async () => {
    const outcome = await attemptForcedToolChoiceRewrite(
      argsFor({ res: new Response("{}", { status: 400 }) })
    )
    expect(outcome.kind).toBe("response")
  })

  test("a body with nothing to rewrite is answered unchanged", async () => {
    const outcome = await attemptForcedToolChoiceRewrite(
      argsFor({ bodyBuffer: bodyOf({ tool_choice: { type: "auto" } }) })
    )
    expect(outcome.kind).toBe("response")
  })

  test("an answer left unchanged carries the body text upstream sent", async () => {
    const outcome = await attemptForcedToolChoiceRewrite(argsFor({ bodyBuffer: null }))
    if (outcome.kind !== "response") throw new Error("the refusal was answered with a retry")
    expect(await outcome.response.text()).toBe(REFUSAL)
  })

  test("an answer left unchanged carries the status text upstream sent", async () => {
    const outcome = await attemptForcedToolChoiceRewrite(argsFor({ bodyBuffer: null }))
    if (outcome.kind !== "response") throw new Error("the refusal was answered with a retry")
    expect(outcome.response.statusText).toBe("Bad Request")
  })

  test("an answer on a trail of one account is written through the seam handed in", async () => {
    await attemptForcedToolChoiceRewrite(argsFor({ bodyBuffer: null }))
    expect(logs.answered).toEqual([["alpha", 400]])
  })

  test("an answer on a longer trail names every account it reached", async () => {
    await attemptForcedToolChoiceRewrite(argsFor({ bodyBuffer: null, trail: ["alpha", "beta"] }))
    expect(logs.answered).toEqual([])
    expect(logs.output.join("\n")).toContain("account=alpha→beta status=400")
  })
})
