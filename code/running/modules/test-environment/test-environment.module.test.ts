import { expect, test } from "bun:test"
import {
  CARRIED,
  carriedFrom,
} from "akasha/code/running/modules/test-environment/test-environment.module.code.ts"

test("a test run is handed the path, the home, the scratch folder, the language and the pod variable alone", () => {
  expect(CARRIED).toEqual(["PATH", "HOME", "TMPDIR", "LANG", "KUBERNETES_SERVICE_HOST"])
})

test("a test run in a pod is told it is in a pod, so it reaches the pages through the forwarder", () => {
  expect(carriedFrom({ KUBERNETES_SERVICE_HOST: "10.96.0.1", PATH: "/bin" })).toEqual({
    PATH: "/bin",
    KUBERNETES_SERVICE_HOST: "10.96.0.1",
  })
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
