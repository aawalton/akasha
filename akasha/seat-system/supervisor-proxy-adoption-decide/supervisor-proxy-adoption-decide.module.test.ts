import { expect, test } from "bun:test"
import {
  decideProxyAdoption,
  type ProxyAdoptionInput,
} from "./supervisor-proxy-adoption-decide.module.code.ts"

const MATCHED: ProxyAdoptionInput = { hasLiveProxy: true, versionMatches: true, healthy: true }

test("no live proxy is answered with a fresh one", () => {
  expect(decideProxyAdoption({ ...MATCHED, hasLiveProxy: false })).toBe("spawn-fresh")
})

test("a live proxy at the version expected here is taken over", () => {
  expect(decideProxyAdoption(MATCHED)).toBe("adopt")
})

test("a healthy proxy at another version is taken over with the drift named", () => {
  expect(decideProxyAdoption({ ...MATCHED, versionMatches: false })).toBe("adopt-with-drift")
})

test("an unhealthy proxy at another version is replaced", () => {
  expect(decideProxyAdoption({ hasLiveProxy: true, versionMatches: false, healthy: false })).toBe(
    "spawn-fresh"
  )
})

test("health is not weighed where the version matches", () => {
  expect(decideProxyAdoption({ ...MATCHED, healthy: false })).toBe("adopt")
})
