import { describe, expect, test } from "bun:test"
import { computeProactiveRefreshDelayMs, decodeJwtExpMs } from "./jwt-exp"

function makeJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url")
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url")
  return `${header}.${body}.signature`
}

describe("decodeJwtExpMs", () => {
  test("extracts exp (seconds) as epoch milliseconds", () => {
    expect(decodeJwtExpMs(makeJwt({ exp: 1_700_000_000, sub: "user" }))).toBe(1_700_000_000_000)
  })

  test("payload without exp is null", () => {
    expect(decodeJwtExpMs(makeJwt({ sub: "user" }))).toBeNull()
  })

  test("non-numeric exp is null", () => {
    expect(decodeJwtExpMs(makeJwt({ exp: "soon" }))).toBeNull()
  })

  test("malformed token shapes are null, never throw", () => {
    expect(decodeJwtExpMs("")).toBeNull()
    expect(decodeJwtExpMs("not-a-jwt")).toBeNull()
    expect(decodeJwtExpMs("a.b")).toBeNull()
    expect(decodeJwtExpMs("a.%%%not-base64%%%.c")).toBeNull()
    const nonJsonPayload = `x.${Buffer.from("banana").toString("base64url")}.y`
    expect(decodeJwtExpMs(nonJsonPayload)).toBeNull()
  })
})

describe("computeProactiveRefreshDelayMs", () => {
  const nowMs = 1_700_000_000_000

  test("future expiry schedules at exp − margin", () => {
    const jwt = makeJwt({ exp: (nowMs + 600_000) / 1000 })
    expect(computeProactiveRefreshDelayMs(jwt, nowMs, 120_000)).toBe(480_000)
  })

  test("expiry within the margin clamps to fire-now", () => {
    const jwt = makeJwt({ exp: (nowMs + 60_000) / 1000 })
    expect(computeProactiveRefreshDelayMs(jwt, nowMs, 120_000)).toBe(0)
  })

  test("already-expired token clamps to fire-now", () => {
    const jwt = makeJwt({ exp: (nowMs - 60_000) / 1000 })
    expect(computeProactiveRefreshDelayMs(jwt, nowMs, 120_000)).toBe(0)
  })

  test("undecodable token yields null (no timer)", () => {
    expect(computeProactiveRefreshDelayMs("garbage", nowMs, 120_000)).toBeNull()
  })
})
