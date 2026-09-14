import { expect, test } from "bun:test"
import {
  NONE_HELD,
  refusalFor,
  SUBAGENT_HEADER,
  stoppedBody,
  stoppedResponse,
  subagentIn,
} from "akasha/agent/model/gateway/modules/subagent-stop-refusal/subagent-stop-refusal.module.code.ts"

const OWN = "a70d67f8ee96115ae"

const AT = "http://localhost:4321/v1/messages"

const EVERY = { has: () => true }

const ONLY_OWN = { has: (own: string) => own === OWN }

function posted(headers: Record<string, string> = {}): Request {
  return new Request(AT, { method: "POST", body: "{}", headers })
}

test("a request with no such header names no subagent", () => {
  expect(subagentIn(posted())).toBeNull()
})

test("a header holding only whitespace names no subagent", () => {
  expect(subagentIn(posted({ [SUBAGENT_HEADER]: "  " }))).toBeNull()
})

test("a request naming a subagent names that subagent", () => {
  expect(subagentIn(posted({ [SUBAGENT_HEADER]: OWN }))).toBe(OWN)
})

test("a request naming no subagent is refused by nothing, whatever is held", () => {
  expect(refusalFor(posted(), EVERY)).toBeNull()
})

test("a request naming a subagent nobody holds is refused by nothing", () => {
  expect(refusalFor(posted({ [SUBAGENT_HEADER]: "a0000000000000000" }), ONLY_OWN)).toBeNull()
})

test("a request naming a held subagent is refused", () => {
  expect(refusalFor(posted({ [SUBAGENT_HEADER]: OWN }), ONLY_OWN)?.status).toBe(400)
})

test("nothing is held where nothing was handed in", () => {
  expect(NONE_HELD.has(OWN)).toBe(false)
})

test("a refusal is a 400 sent as json", () => {
  const res = stoppedResponse(OWN)
  expect(res.status).toBe(400)
  expect(res.statusText).toBe("Bad Request")
  expect(res.headers.get("content-type")).toBe("application/json")
})

test("a refusal has the anthropic error envelope", () => {
  const body = stoppedBody(OWN)
  expect(body.type).toBe("error")
  expect(body.error.type).toBe("invalid_request_error")
})

test("a refusal names the subagent and the agents panel", () => {
  const message = stoppedBody(OWN).error.message
  expect(message).toContain(OWN)
  expect(message).toContain("agents panel")
})

test("a refusal says every later turn of that subagent is refused too", () => {
  expect(stoppedBody(OWN).error.message).toContain("every later turn")
})

test("a response body is the body built for the same subagent", async () => {
  expect(await stoppedResponse(OWN).json()).toEqual(stoppedBody(OWN))
})

function recording(has: (own: string) => boolean): {
  readonly held: { has: (own: string) => boolean; taken: (own: string) => undefined }
  readonly asked: readonly string[]
} {
  const asked: string[] = []
  return {
    held: {
      has,
      taken: (own): undefined => {
        asked.push(own)
        return undefined
      },
    },
    asked,
  }
}

test("a refused turn asks for that subagent's page to be taken", () => {
  const held = recording((own) => own === OWN)
  refusalFor(posted({ [SUBAGENT_HEADER]: OWN }), held.held)
  expect(held.asked).toEqual([OWN])
})

test("a turn nobody stopped asks for no page to be taken", () => {
  const held = recording(() => false)
  refusalFor(posted({ [SUBAGENT_HEADER]: OWN }), held.held)
  expect(held.asked).toEqual([])
})

test("a held set naming no take-down refuses the turn all the same", () => {
  expect(refusalFor(posted({ [SUBAGENT_HEADER]: OWN }), ONLY_OWN)?.status).toBe(400)
})
