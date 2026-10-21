import { expect, test } from "bun:test"
import {
  CARRIED,
  carriedFrom,
} from "akasha/code/running/modules/test-environment/test-environment.module.code.ts"

test("a test run is handed the path, the home, the scratch folder and the language alone", () => {
  expect(CARRIED).toEqual(["PATH", "HOME", "TMPDIR", "LANG"])
})

test("a secret the caller holds is left out, known by name or not", () => {
  const caller = {
    PATH: "/bin",
    HOME: "/home/one",
    GOOGLE_OAUTH_REFRESH_TOKEN: "held",
    SOPS_AGE_KEY: "held",
    HELD_UNHEARD_OF: "held",
  }
  expect(carriedFrom(caller)).toEqual({ PATH: "/bin", HOME: "/home/one" })
})

test("a name the caller does not hold is left out rather than handed empty", () => {
  expect(carriedFrom({})).toEqual({})
  expect(carriedFrom({ LANG: undefined, TMPDIR: "/var/tmp" })).toEqual({ TMPDIR: "/var/tmp" })
})
