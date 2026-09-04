import { expect, test } from "bun:test"
import {
  classifyModelUnavailable,
  decideModelUnavailableAction,
  isModelUnavailable,
  MODEL_UNAVAILABLE_STATUS,
  NOT_FOUND_ERROR_TYPE,
} from "./model-unavailable.module.code.ts"

const MISSING_BODY = JSON.stringify({
  type: "error",
  error: { type: "not_found_error", message: "model: claude-opus-9" },
})

test("a status other than 404 matches nothing", () => {
  expect(classifyModelUnavailable(403, MISSING_BODY)).toEqual({ matched: false })
  expect(classifyModelUnavailable(400, MISSING_BODY)).toEqual({ matched: false })
  expect(classifyModelUnavailable(200, MISSING_BODY)).toEqual({ matched: false })
  expect(MODEL_UNAVAILABLE_STATUS).toBe(404)
})

test("a body the JSON parser refuses matches nothing", () => {
  expect(classifyModelUnavailable(404, "")).toEqual({ matched: false })
  expect(classifyModelUnavailable(404, "not found")).toEqual({ matched: false })
})

test("a body carrying no Anthropic error envelope matches nothing", () => {
  expect(classifyModelUnavailable(404, "null")).toEqual({ matched: false })
  expect(classifyModelUnavailable(404, "[]")).toEqual({ matched: false })
  expect(
    classifyModelUnavailable(404, JSON.stringify({ error: { type: "not_found_error" } }))
  ).toEqual({
    matched: false,
  })
  expect(classifyModelUnavailable(404, JSON.stringify({ type: "error", error: "gone" }))).toEqual({
    matched: false,
  })
})

test("an envelope naming an error type other than not_found_error matches nothing", () => {
  const other = JSON.stringify({
    type: "error",
    error: { type: "permission_error", message: "no" },
  })
  expect(classifyModelUnavailable(404, other)).toEqual({ matched: false })
})

test("a body carrying keys the envelope does not name still matches", () => {
  const extra = JSON.stringify({
    type: "error",
    request_id: "req_2",
    error: { type: "not_found_error", message: "gone", hint: ["retry"] },
  })
  expect(classifyModelUnavailable(404, extra)).toEqual({ matched: true, reason: "gone" })
})

test("a match carries the envelope message as the reason", () => {
  expect(classifyModelUnavailable(404, MISSING_BODY)).toEqual({
    matched: true,
    reason: "model: claude-opus-9",
  })
})

test("a match reading an envelope with no message carries not_found_error as the reason", () => {
  const bare = JSON.stringify({ type: "error", error: { type: "not_found_error" } })
  expect(classifyModelUnavailable(404, bare)).toEqual({ matched: true, reason: "not_found_error" })
  expect(NOT_FOUND_ERROR_TYPE).toBe("not_found_error")
})

test("isModelUnavailable answers the matched flag classifyModelUnavailable returns", () => {
  expect(isModelUnavailable(404, MISSING_BODY)).toBe(true)
  expect(isModelUnavailable(404, "{}")).toBe(false)
  expect(isModelUnavailable(500, MISSING_BODY)).toBe(false)
})

test("a reason no account has marked decides mark-rebind", () => {
  const marks = new Map<string, string>()
  expect(decideModelUnavailableAction(marks, "model: gone", "acct-a")).toEqual({
    action: "mark-rebind",
  })
})

test("a reason the current account marked first decides mark-rebind", () => {
  const marks = new Map<string, string>([["model: gone", "acct-a"]])
  expect(decideModelUnavailableAction(marks, "model: gone", "acct-a")).toEqual({
    action: "mark-rebind",
  })
})

test("a reason another account marked first decides global-unmark naming that account", () => {
  const marks = new Map<string, string>([["model: gone", "acct-a"]])
  expect(decideModelUnavailableAction(marks, "model: gone", "acct-b")).toEqual({
    action: "global-unmark",
    firstAccount: "acct-a",
  })
})

test("the reason a classification carries is the key the marks are held under", () => {
  const classified = classifyModelUnavailable(404, MISSING_BODY)
  expect(classified.matched).toBe(true)
  const reason = classified.matched ? classified.reason : ""
  const marks = new Map<string, string>([[reason, "acct-a"]])
  expect(decideModelUnavailableAction(marks, reason, "acct-b")).toEqual({
    action: "global-unmark",
    firstAccount: "acct-a",
  })
})

test("nothing here writes to the map of marked reasons", () => {
  const marks = new Map<string, string>([["model: gone", "acct-a"]])
  decideModelUnavailableAction(marks, "model: gone", "acct-b")
  decideModelUnavailableAction(marks, "model: other", "acct-b")
  expect([...marks.entries()]).toEqual([["model: gone", "acct-a"]])
})

test("nothing here sees more of a response than the status and the body", () => {
  expect(classifyModelUnavailable.length).toBe(2)
  expect(isModelUnavailable.length).toBe(2)
})

test("an envelope message that is an empty string becomes an empty reason", () => {
  const empty = JSON.stringify({ type: "error", error: { type: "not_found_error", message: "" } })
  expect(classifyModelUnavailable(404, empty)).toEqual({ matched: true, reason: "" })
})

test("a mark held under an empty account name decides global-unmark", () => {
  const marks = new Map<string, string>([["model: gone", ""]])
  expect(decideModelUnavailableAction(marks, "model: gone", "acct-b")).toEqual({
    action: "global-unmark",
    firstAccount: "",
  })
})

test("the Anthropic error envelope schema is declared here rather than in a module of its own", () => {
  expect(classifyModelUnavailable(404, MISSING_BODY).matched).toBe(true)
  expect(
    classifyModelUnavailable(404, JSON.stringify({ type: "oops", error: { type: "x" } }))
  ).toEqual({
    matched: false,
  })
})
