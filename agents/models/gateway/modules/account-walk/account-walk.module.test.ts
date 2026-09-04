import { afterEach, beforeEach, expect, mock, spyOn, test } from "bun:test"
import { runAccountWalk } from "./account-walk.module.code.ts"
import {
  bodyOf,
  buildHarness,
  capacityLimited,
  credentialFor,
  forcedToolChoiceRefused,
  modelMissing,
  overloaded,
  permissionDenied,
  unauthorized,
} from "./account-walk.module.test-fixtures.ts"

const SAID: { output: string[]; error: string[]; warn: string[] } = {
  output: [],
  error: [],
  warn: [],
}

beforeEach(() => {
  SAID.output = []
  SAID.error = []
  SAID.warn = []
  spyOn(console, "log").mockImplementation((...parts: unknown[]) => {
    SAID.output.push(parts.map(String).join(" "))
  })
  spyOn(console, "error").mockImplementation((...parts: unknown[]) => {
    SAID.error.push(parts.map(String).join(" "))
  })
  spyOn(console, "warn").mockImplementation((...parts: unknown[]) => {
    SAID.warn.push(parts.map(String).join(" "))
  })
})

afterEach(() => {
  mock.restore()
})

const ok = (): Response => new Response("ok", { status: 200 })

test("a pool with no account is answered empty rather than forwarded", async () => {
  const harness = buildHarness({ answers: [ok], accounts: [] })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome).toEqual({
    kind: "empty-pool",
    reason: "no-viable-account",
    trailDisplay: "-",
  })
  expect(harness.sent).toEqual([])
})

test("an account with no fresh token is forwarded with no token at all", async () => {
  const harness = buildHarness({ answers: [ok], freshTokens: async () => null })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome.kind).toBe("served")
  expect(harness.sent).toEqual([{ account: null, token: null, beta: null, body: null }])
})

test("a fallthrough with no fresh token names the account that was chosen", async () => {
  const harness = buildHarness({ answers: [ok], freshTokens: async () => null })
  await runAccountWalk(harness.argsWith())
  expect(SAID.output.join("\n")).toContain("fallthrough=no-fresh-token account-picked=alpha")
})

test("a first attempt that succeeds is served with no second account tried", async () => {
  const harness = buildHarness({ answers: [ok] })
  const outcome = await runAccountWalk(harness.argsWith())
  if (outcome.kind !== "served") throw new Error("the walk served nothing")
  expect(await outcome.response.text()).toBe("ok")
  expect(harness.sent.map((one) => one.account)).toEqual(["alpha"])
})

test("the first attempt carries the token read for the account chosen", async () => {
  const harness = buildHarness({ answers: [ok] })
  await runAccountWalk(harness.argsWith())
  expect(harness.sent[0]?.token).toBe("fake-access-alpha")
})

test("a forward that throws is answered 502", async () => {
  const harness = buildHarness({
    answers: [ok],
    seams: {
      forward: async () => {
        throw new Error("the socket went away")
      },
    },
  })
  const outcome = await runAccountWalk(harness.argsWith())
  if (outcome.kind !== "served") throw new Error("the walk served nothing")
  expect(outcome.response.status).toBe(502)
})

test("a forward that throws is written about on the error seam", async () => {
  const harness = buildHarness({
    answers: [ok],
    seams: {
      forward: async () => {
        throw new Error("the socket went away")
      },
    },
  })
  await runAccountWalk(harness.argsWith())
  expect(SAID.error.join("\n")).toContain("transport-error=the socket went away")
})

test("a 403 the classifier matches disables that account and moves on", async () => {
  const harness = buildHarness({ answers: [permissionDenied, ok] })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome.kind).toBe("served")
  expect(harness.acts.disabled).toEqual([["alpha", "no reach"]])
  expect(harness.sent.map((one) => one.account)).toEqual(["alpha", "beta"])
})

test("a 404 the classifier matches disables that account and moves on", async () => {
  const harness = buildHarness({ answers: [modelMissing, ok] })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome.kind).toBe("served")
  expect(harness.acts.disabled).toEqual([["alpha", "model_unavailable: no model"]])
})

test("a 404 on an extended-context body replays the base sibling at the same account", async () => {
  const harness = buildHarness({
    answers: [modelMissing, ok],
    originalBody: bodyOf({ model: "claude-opus-5[1m]" }),
  })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome.kind).toBe("served")
  expect(harness.sent.map((one) => one.account)).toEqual(["alpha", "alpha"])
  expect(harness.sent[1]?.body).toContain('"model":"claude-opus-5"')
})

test("the base sibling is replayed once and no more", async () => {
  const harness = buildHarness({
    answers: [modelMissing, modelMissing, ok],
    originalBody: bodyOf({ model: "claude-opus-5[1m]" }),
  })
  await runAccountWalk(harness.argsWith())
  expect(harness.sent.map((one) => one.account)).toEqual(["alpha", "alpha", "beta"])
})

test("a 400 refusing a forced tool choice replays the same account with the choice left open", async () => {
  const harness = buildHarness({
    answers: [forcedToolChoiceRefused, ok],
    originalBody: bodyOf({ tool_choice: { type: "tool" } }),
  })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome.kind).toBe("served")
  expect(harness.sent.map((one) => one.account)).toEqual(["alpha", "alpha"])
  expect(harness.sent[1]?.body).toContain('"tool_choice":{"type":"auto"}')
})

test("a tool choice is rewritten once and no more", async () => {
  const harness = buildHarness({
    answers: [forcedToolChoiceRefused, forcedToolChoiceRefused, ok],
    originalBody: bodyOf({ tool_choice: { type: "tool" } }),
  })
  const outcome = await runAccountWalk(harness.argsWith())
  if (outcome.kind !== "served") throw new Error("the walk served nothing")
  expect(outcome.response.status).toBe(400)
  expect(harness.sent.length).toBe(2)
})

test("a 401 replays the same account once the store holds a newer credential", async () => {
  let read = 0
  const harness = buildHarness({
    answers: [unauthorized, ok],
    freshTokens: async (account) => {
      read += 1
      return read === 1
        ? credentialFor(account)
        : { ...credentialFor(account), accessToken: "fake-access-newer" }
    },
  })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome.kind).toBe("served")
  expect(harness.sent.map((one) => one.token)).toEqual(["fake-access-alpha", "fake-access-newer"])
})

test("a 401 is retried once for one account and no more", async () => {
  let read = 0
  const harness = buildHarness({
    answers: [unauthorized, unauthorized, ok],
    freshTokens: async (account) => {
      read += 1
      return { ...credentialFor(account), accessToken: `fake-access-${read}` }
    },
  })
  const outcome = await runAccountWalk(harness.argsWith())
  if (outcome.kind !== "served") throw new Error("the walk served nothing")
  expect(outcome.response.status).toBe(401)
  expect(harness.sent.length).toBe(2)
})

test("a 529 is retried at the same account before any other account is tried", async () => {
  const harness = buildHarness({ answers: [() => overloaded(529), ok] })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome.kind).toBe("served")
  expect(harness.sent.map((one) => one.account)).toEqual(["alpha", "alpha"])
})

test("a 429 upstream calls a capacity limit marks that account and moves on", async () => {
  const harness = buildHarness({ answers: [capacityLimited, ok] })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome.kind).toBe("served")
  expect(harness.acts.atLimit).toEqual(["alpha"])
  expect(harness.sent.map((one) => one.account)).toEqual(["alpha", "beta"])
})

test("a 429 asks for the account's usage to be read again", async () => {
  const harness = buildHarness({ answers: [capacityLimited, ok] })
  await runAccountWalk(harness.argsWith())
  expect(harness.acts.repolled).toEqual(["alpha"])
})

test("a 429 on a fable request rebinds without marking the account at its limit", async () => {
  const harness = buildHarness({
    answers: [capacityLimited, ok],
    originalBody: bodyOf({ model: "claude-fable-5" }),
  })
  await runAccountWalk(harness.argsWith())
  expect(harness.acts.atLimit).toEqual([])
  expect(harness.sent.map((one) => one.account)).toEqual(["alpha", "beta"])
})

test("a 429 on a fast-mode request strips the speed and replays the same account", async () => {
  const harness = buildHarness({
    answers: [capacityLimited, ok],
    originalBody: bodyOf({ model: "claude-opus-5", speed: "fast" }),
  })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome.kind).toBe("served")
  expect(harness.sent.map((one) => one.account)).toEqual(["alpha", "alpha"])
  expect(harness.acts.atLimit).toEqual([])
})

test("a 429 with every account exhausted is answered empty naming the trail", async () => {
  const harness = buildHarness({ answers: [capacityLimited] })
  const outcome = await runAccountWalk(harness.argsWith())
  expect(outcome).toEqual({
    kind: "empty-pool",
    reason: "no-viable-account",
    trailDisplay: "alpha→beta",
  })
})

test("a terminal error above 400 is written about on the error seam", async () => {
  const harness = buildHarness({ answers: [() => new Response("nope", { status: 418 })] })
  await runAccountWalk(harness.argsWith())
  expect(SAID.error.join("\n")).toContain("upstream-terminal-error POST /v1/messages")
})

test("an answer under 400 on a trail of one account names that account alone", async () => {
  const harness = buildHarness({ answers: [ok] })
  await runAccountWalk(harness.argsWith())
  expect(SAID.output.join("\n")).toContain("res POST /v1/messages account=alpha status=200")
})

test("an answer under 400 on a longer trail names every account reached", async () => {
  const harness = buildHarness({ answers: [capacityLimited, ok] })
  await runAccountWalk(harness.argsWith())
  expect(SAID.output.join("\n")).toContain("account=alpha→beta status=200")
})

test("a repoll that rejects is written about rather than left unhandled", async () => {
  const harness = buildHarness({
    answers: [capacityLimited, ok],
    seams: {
      repollAfterLimit: async (): Promise<undefined> => {
        throw new Error("the usage read failed")
      },
    },
  })
  await runAccountWalk(harness.argsWith())
  await Promise.resolve()
  expect(SAID.error.join("\n")).toContain("repoll-after-limit account=alpha failed")
})
