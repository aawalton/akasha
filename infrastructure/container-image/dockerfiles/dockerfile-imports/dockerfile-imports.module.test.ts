import { describe, expect, test } from "bun:test"
import { buildPackageNameMap } from "akasha/infrastructure/container-image/dockerfiles/dockerfile-deps/dockerfile-deps.module.code.ts"
import {
  collectExecutedDeps,
  listEntryRoots,
} from "akasha/infrastructure/container-image/dockerfiles/dockerfile-imports/dockerfile-imports.module.code.ts"

const AUTH_PROXY = "infrastructure/networks/auth-proxy"
const REACHED = "utils/narrow/require-env"

describe("what a service reaches", () => {
  test("a service holding no src folder answers its own files as entries", () => {
    expect(listEntryRoots(AUTH_PROXY).length).toBeGreaterThan(0)
  })

  test("a folder reached through the root package is answered", () => {
    expect(collectExecutedDeps(AUTH_PROXY, buildPackageNameMap())).toContain(REACHED)
  })
})
