import { afterEach, expect, test } from "bun:test"
import {
  optionalEnv,
  requireEnv,
} from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"

const NAME = "AKASHA_REQUIRE_ENV_UNDER_TEST"

const REFUSED = `requireEnv: env var ${NAME} is not set`

afterEach(() => {
  delete process.env[NAME]
})

test("a name nothing sets is refused", () => {
  expect(() => requireEnv(NAME)).toThrow(REFUSED)
})

test("a name set to the empty string is refused, so a set-but-empty name counts as unset", () => {
  process.env[NAME] = ""
  expect(() => requireEnv(NAME)).toThrow(REFUSED)
})

test("a name set to a word answers that word", () => {
  process.env[NAME] = "held"
  expect(requireEnv(NAME)).toBe("held")
})

test("an optional read of a name nothing sets answers nothing", () => {
  expect(optionalEnv(NAME)).toBeUndefined()
})

test("an optional read of the empty string answers nothing rather than the empty string", () => {
  process.env[NAME] = ""
  expect(optionalEnv(NAME)).toBeUndefined()
})

test("an optional read of a word answers that word", () => {
  process.env[NAME] = "held"
  expect(optionalEnv(NAME)).toBe("held")
})
