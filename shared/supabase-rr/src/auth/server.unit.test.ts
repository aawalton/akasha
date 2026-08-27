import { describe, expect, test } from "bun:test"
import { parseBearerToken } from "./server"

describe("parseBearerToken — the header gate", () => {
  test("extracts the JWT from a Bearer header", () => {
    expect(parseBearerToken("Bearer jwt-abc")).toBe("jwt-abc")
  })
  test("is case-insensitive on the scheme", () => {
    expect(parseBearerToken("bearer jwt-abc")).toBe("jwt-abc")
    expect(parseBearerToken("BEARER jwt-abc")).toBe("jwt-abc")
  })
  test("returns null for a non-Bearer scheme (falls through to the cookie path)", () => {
    expect(parseBearerToken("Basic dXNlcjpwYXNz")).toBeNull()
  })
  test("returns null for an absent header", () => {
    expect(parseBearerToken(null)).toBeNull()
  })
  test("returns null for an empty string", () => {
    expect(parseBearerToken("")).toBeNull()
  })
})
