import { afterEach, describe, expect, test } from "bun:test"
import { NarrowError } from "./narrow-error"
import { optionalEnv, requireEnv } from "./require-env"

const TEST_KEY = "__REQUIRE_ENV_TEST__"

afterEach(() => {
  delete process.env[TEST_KEY]
})

describe("requireEnv", () => {
  test("returns the env var value when set to a non-empty string", () => {
    process.env[TEST_KEY] = "hello"
    expect(requireEnv(TEST_KEY)).toBe("hello")
  })

  test("throws NarrowError when the env var is unset", () => {
    expect(() => requireEnv(TEST_KEY)).toThrow(NarrowError)
  })

  test("throws NarrowError when the env var is the empty string", () => {
    process.env[TEST_KEY] = ""
    expect(() => requireEnv(TEST_KEY)).toThrow(NarrowError)
  })

  test("error message includes the env var name", () => {
    expect(() => requireEnv(TEST_KEY)).toThrow(new RegExp(`env var ${TEST_KEY} is not set`))
  })
})

describe("optionalEnv", () => {
  test("returns the env var value when set to a non-empty string", () => {
    process.env[TEST_KEY] = "hello"
    expect(optionalEnv(TEST_KEY)).toBe("hello")
  })

  test("returns undefined when the env var is unset", () => {
    expect(optionalEnv(TEST_KEY)).toBeUndefined()
  })

  test("returns undefined when the env var is the empty string (empty ⇒ absent)", () => {
    process.env[TEST_KEY] = ""
    expect(optionalEnv(TEST_KEY)).toBeUndefined()
  })
})
