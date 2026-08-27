import { describe, expect, test } from "bun:test"
import { decodeJwtSub } from "./jwt-sub"

function makeJwt(payload: Record<string, unknown>): string {
  const b64url = (obj: unknown): string =>
    btoa(JSON.stringify(obj)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
  return `${b64url({ alg: "HS256", typ: "JWT" })}.${b64url(payload)}.sig`
}

describe("decodeJwtSub", () => {
  test("returns the sub claim of a well-formed JWT", () => {
    expect(decodeJwtSub(makeJwt({ sub: "user-abc", exp: 123 }))).toBe("user-abc")
  })

  test("passes through other claims and still reads sub", () => {
    expect(decodeJwtSub(makeJwt({ sub: "u1", iss: "supabase", aud: "authenticated" }))).toBe("u1")
  })

  test("returns null when the payload has no sub", () => {
    expect(decodeJwtSub(makeJwt({ exp: 123 }))).toBeNull()
  })

  test("returns null when sub is not a string", () => {
    expect(decodeJwtSub(makeJwt({ sub: 42 }))).toBeNull()
  })

  test("returns null for a non-three-part token", () => {
    expect(decodeJwtSub("only.two")).toBeNull()
    expect(decodeJwtSub("nope")).toBeNull()
  })

  test("returns null when the payload is not decodable base64url JSON", () => {
    expect(decodeJwtSub("aaa.%%%.bbb")).toBeNull()
  })
})
