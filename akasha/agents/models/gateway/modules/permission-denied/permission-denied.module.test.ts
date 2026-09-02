import { expect, test } from "bun:test"
import {
  classifyPermissionDenied,
  isPermissionDenied,
  PERMISSION_DENIED_STATUS,
  PERMISSION_ERROR_TYPE,
} from "./permission-denied.module.code.ts"

const DENIED_BODY = JSON.stringify({
  type: "error",
  error: { type: "permission_error", message: "seat lacks the scope" },
})

test("a status other than 403 matches nothing", () => {
  expect(classifyPermissionDenied(401, DENIED_BODY)).toEqual({ matched: false })
  expect(classifyPermissionDenied(404, DENIED_BODY)).toEqual({ matched: false })
  expect(classifyPermissionDenied(200, DENIED_BODY)).toEqual({ matched: false })
  expect(PERMISSION_DENIED_STATUS).toBe(403)
})

test("a body the JSON parser refuses matches nothing", () => {
  expect(classifyPermissionDenied(403, "")).toEqual({ matched: false })
  expect(classifyPermissionDenied(403, "<html>403</html>")).toEqual({ matched: false })
})

test("a body carrying no Anthropic error envelope matches nothing", () => {
  expect(classifyPermissionDenied(403, "null")).toEqual({ matched: false })
  expect(classifyPermissionDenied(403, "[]")).toEqual({ matched: false })
  expect(
    classifyPermissionDenied(403, JSON.stringify({ error: { type: "permission_error" } }))
  ).toEqual({
    matched: false,
  })
  expect(classifyPermissionDenied(403, JSON.stringify({ type: "error" }))).toEqual({
    matched: false,
  })
  expect(
    classifyPermissionDenied(403, JSON.stringify({ type: "error", error: { type: 7 } }))
  ).toEqual({
    matched: false,
  })
})

test("an envelope naming an error type other than permission_error matches nothing", () => {
  const other = JSON.stringify({
    type: "error",
    error: { type: "not_found_error", message: "gone" },
  })
  expect(classifyPermissionDenied(403, other)).toEqual({ matched: false })
})

test("a body carrying keys the envelope does not name still matches", () => {
  const extra = JSON.stringify({
    type: "error",
    request_id: "req_1",
    error: { type: "permission_error", message: "nope", detail: { code: 9 } },
  })
  expect(classifyPermissionDenied(403, extra)).toEqual({ matched: true, reason: "nope" })
})

test("a match carries the envelope message as the reason", () => {
  expect(classifyPermissionDenied(403, DENIED_BODY)).toEqual({
    matched: true,
    reason: "seat lacks the scope",
  })
})

test("a match reading an envelope with no message carries permission_error as the reason", () => {
  const bare = JSON.stringify({ type: "error", error: { type: "permission_error" } })
  expect(classifyPermissionDenied(403, bare)).toEqual({ matched: true, reason: "permission_error" })
  expect(PERMISSION_ERROR_TYPE).toBe("permission_error")
})

test("isPermissionDenied answers the matched flag classifyPermissionDenied returns", () => {
  expect(isPermissionDenied(403, DENIED_BODY)).toBe(true)
  expect(isPermissionDenied(403, "{}")).toBe(false)
  expect(isPermissionDenied(500, DENIED_BODY)).toBe(false)
})

test("nothing here sees more of a response than the status and the body", () => {
  expect(classifyPermissionDenied.length).toBe(2)
  expect(isPermissionDenied.length).toBe(2)
})

test("an envelope message that is an empty string becomes an empty reason", () => {
  const empty = JSON.stringify({ type: "error", error: { type: "permission_error", message: "" } })
  expect(classifyPermissionDenied(403, empty)).toEqual({ matched: true, reason: "" })
})

test("the Anthropic error envelope schema is declared here rather than in a module of its own", () => {
  expect(classifyPermissionDenied(403, DENIED_BODY).matched).toBe(true)
  expect(
    classifyPermissionDenied(403, JSON.stringify({ type: "oops", error: { type: "x" } }))
  ).toEqual({
    matched: false,
  })
})
