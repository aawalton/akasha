import { expect, test } from "bun:test"
import {
  alreadyRunning,
  CARRIED,
  carriedFrom,
  RUNNING,
} from "akasha/code/running/modules/test-environment/test-environment.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"

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

test("the mark a run carries is read back by whoever is inside it", () => {
  expect(RUNNING).toBe("AKASHA_TESTS_RUNNING")
  const was = optionalEnv(RUNNING)
  process.env[RUNNING] = "1"
  expect(alreadyRunning()).toBe(true)
  delete process.env[RUNNING]
  expect(alreadyRunning()).toBe(false)
  if (was === undefined) delete process.env[RUNNING]
  else process.env[RUNNING] = was
})
