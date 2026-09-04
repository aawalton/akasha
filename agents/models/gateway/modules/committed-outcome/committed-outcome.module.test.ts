import { expect, test } from "bun:test"
import { classifyCommittedServed, mapStatusToSseError } from "./committed-outcome.module.code.ts"

test("a status from 200 to 299 is spliced through", () => {
  for (const status of [200, 201, 202, 204, 250, 299]) {
    expect(classifyCommittedServed(status)).toBe("splice")
  }
})

test("a status outside 200 to 299 becomes an error frame", () => {
  for (const status of [0, 100, 199, 300, 400, 429, 500, 503, 529, 599]) {
    expect(classifyCommittedServed(status)).toBe("error-frame")
  }
})

test("a redirect is an error frame rather than a status to follow", () => {
  for (const status of [301, 302, 307, 308]) {
    expect(classifyCommittedServed(status)).toBe("error-frame")
  }
})

test("each status carries the error type Anthropic gives that status", () => {
  const named: ReadonlyArray<readonly [number, string]> = [
    [400, "invalid_request_error"],
    [401, "authentication_error"],
    [403, "permission_error"],
    [404, "not_found_error"],
    [413, "request_too_large"],
    [429, "rate_limit_error"],
    [503, "overloaded_error"],
    [529, "overloaded_error"],
  ]
  for (const [status, errorType] of named) {
    expect(mapStatusToSseError(status).errorType).toBe(errorType)
  }
})

test("a rate limit is never named as a fault the client should give up on", () => {
  expect(mapStatusToSseError(429).errorType).not.toBe("api_error")
})

test("a status given no name of its own is named api_error", () => {
  for (const status of [402, 405, 418, 451, 500, 502, 504, 200]) {
    expect(mapStatusToSseError(status).errorType).toBe("api_error")
  }
})

test("the message names the status the message was made from", () => {
  expect(mapStatusToSseError(504).message).toContain("504")
  expect(mapStatusToSseError(504).message).not.toContain("429")
  expect(mapStatusToSseError(429).message).toContain("429")
  expect(mapStatusToSseError(529).message).toContain("529")
})

test("a status that splices still gets an error name when an error name is asked for", () => {
  expect(classifyCommittedServed(200)).toBe("splice")
  expect(mapStatusToSseError(200).errorType).toBe("api_error")
  expect(mapStatusToSseError(200).message).toContain("200")
})
