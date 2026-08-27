import { describe, expect, test } from "bun:test"
import { InputError } from "@shared/errors-core/exit"
import { parseOauthCallbackUrl } from "./oauth-callback"

describe("parseOauthCallbackUrl", () => {
  test("extracts the code and reconstructs the redirect_uri including the port", () => {
    expect(
      parseOauthCallbackUrl(
        "http://127.0.0.1:45775/callback?code=ABC123&scope=https://www.googleapis.com/auth/drive.readonly"
      )
    ).toEqual({ redirectUri: "http://127.0.0.1:45775/callback", code: "ABC123" })
  })

  test("preserves a code containing slashes and dashes (real Google code shape)", () => {
    expect(
      parseOauthCallbackUrl(
        "http://127.0.0.1:45775/callback?iss=https://accounts.google.com&code=4/0Adk-xyz_AbC&scope=x"
      ).code
    ).toBe("4/0Adk-xyz_AbC")
  })

  test("trims surrounding whitespace and quotes", () => {
    expect(parseOauthCallbackUrl("  'http://127.0.0.1:51000/callback?code=ZZZ'  ")).toEqual({
      redirectUri: "http://127.0.0.1:51000/callback",
      code: "ZZZ",
    })
    expect(parseOauthCallbackUrl('"http://127.0.0.1:51000/callback?code=ZZZ"').code).toBe("ZZZ")
  })

  test("throws InputError when the URL carries an error param (consent denied)", () => {
    expect(() =>
      parseOauthCallbackUrl("http://127.0.0.1:45775/callback?error=access_denied")
    ).toThrow(InputError)
  })

  test("throws InputError when the code is absent", () => {
    expect(() => parseOauthCallbackUrl("http://127.0.0.1:45775/callback?scope=x")).toThrow(
      InputError
    )
  })

  test("throws InputError on input that is not a URL", () => {
    expect(() => parseOauthCallbackUrl("not a url at all")).toThrow(InputError)
  })
})
