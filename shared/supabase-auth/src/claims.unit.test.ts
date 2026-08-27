import { describe, expect, test } from "bun:test"
import { parseClaimsToUser } from "./claims"

describe("parseClaimsToUser", () => {
  test("maps sub + email to the SupabaseUser envelope", () => {
    const user = parseClaimsToUser({
      sub: "11111111-1111-1111-1111-111111111111",
      email: "alan@example.com",
      role: "authenticated",
      aud: "authenticated",
      exp: 1715769600,
    })
    expect(user).toEqual({
      id: "11111111-1111-1111-1111-111111111111",
      email: "alan@example.com",
    })
  })

  test("maps a claims payload with no email to email: null", () => {
    const user = parseClaimsToUser({
      sub: "22222222-2222-2222-2222-222222222222",
      role: "authenticated",
    })
    expect(user).toEqual({
      id: "22222222-2222-2222-2222-222222222222",
      email: null,
    })
  })

  test("ignores the many extra JWT claims and reads only sub/email", () => {
    const user = parseClaimsToUser({
      sub: "33333333-3333-3333-3333-333333333333",
      email: "x@y.z",
      app_metadata: { provider: "email" },
      user_metadata: { foo: "bar" },
      amr: [{ method: "password", timestamp: 1 }],
      session_id: "ssss",
      is_anonymous: false,
    })
    expect(user).toEqual({ id: "33333333-3333-3333-3333-333333333333", email: "x@y.z" })
  })

  test("returns null when sub is missing (malformed payload)", () => {
    expect(parseClaimsToUser({ email: "no-sub@example.com" })).toBeNull()
  })

  test("returns null when sub is not a string", () => {
    expect(parseClaimsToUser({ sub: 12345, email: "n@e.com" })).toBeNull()
  })

  test("returns null for non-object input", () => {
    expect(parseClaimsToUser(null)).toBeNull()
    expect(parseClaimsToUser(undefined)).toBeNull()
    expect(parseClaimsToUser("not-an-object")).toBeNull()
  })

  test("returns null when email is present but not a string", () => {
    expect(parseClaimsToUser({ sub: "44444444-4444-4444-4444-444444444444", email: 99 })).toBeNull()
  })
})
