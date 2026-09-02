import { expect, test } from "bun:test"
import { classifyCommittedServed, mapStatusToSseError } from "./committed-outcome.module.code.ts"

test("a status from 200 to 299 is spliced through", () => {
  for (const status of [200, 201, 202, 204, 250, 299]) {
    expect(classifyCommittedServed(status)).toBe("splice")
  }
})

test("every other status becomes an error frame", () => {
  for (const status of [0, 100, 199, 300, 400, 429, 500, 503, 529, 599]) {
    expect(classifyCommittedServed(status)).toBe("error-frame")
  }
})

test("a redirect is an error frame rather than a status to follow", () => {
  for (const status of [301, 302, 307, 308]) {
    expect(classifyCommittedServed(status)).toBe("error-frame")
  }
})

test("status 503 and status 529 are named overloaded_error", () => {
  expect(mapStatusToSseError(503).errorType).toBe("overloaded_error")
  expect(mapStatusToSseError(529).errorType).toBe("overloaded_error")
})

test("every other status is named api_error", () => {
  for (const status of [400, 401, 404, 429, 500, 502, 504, 200]) {
    expect(mapStatusToSseError(status).errorType).toBe("api_error")
  }
})

test("the message names the status it was made from", () => {
  expect(mapStatusToSseError(504).message).toContain("504")
  expect(mapStatusToSseError(504).message).not.toContain("429")
  expect(mapStatusToSseError(429).message).toContain("429")
  expect(mapStatusToSseError(529).message).toContain("529")
})

test("a status that splices still gets an error name when one is asked for", () => {
  expect(classifyCommittedServed(200)).toBe("splice")
  expect(mapStatusToSseError(200).errorType).toBe("api_error")
  expect(mapStatusToSseError(200).message).toContain("200")
})
