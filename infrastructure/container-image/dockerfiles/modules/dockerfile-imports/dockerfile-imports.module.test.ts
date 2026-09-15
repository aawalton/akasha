import { describe, expect, test } from "bun:test"
import {
  collectExecutedDeps,
  listEntryRoots,
} from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-imports/dockerfile-imports.module.code.ts"

const AUTH_PROXY = "infrastructure/network/auth-proxy"
const REACHED = "/require-env"

describe("what a service reaches", () => {
  test("a service holding no src folder answers its own files as entries", () => {
    expect(listEntryRoots(AUTH_PROXY).length).toBeGreaterThan(0)
  })

  test("a folder reached through the root package is answered", () => {
    const found = [...collectExecutedDeps(AUTH_PROXY)]
    expect(found.filter((one) => one.endsWith(REACHED))).toHaveLength(1)
  })
})
