import { describe, expect, test } from "bun:test"
import {
  collectExecutedDeps,
  listEntryRoots,
  seenAt,
} from "akasha/infrastructure/container-image/dockerfile/modules/imports/dockerfile-imports.module.code.ts"

const AUTH_PROXY = "infrastructure/network/auth-proxy"
const REACHED = "/require-env"
const SEEN = seenAt(process.cwd())

describe("what a service reaches", () => {
  test("a service holding no src folder answers its own files as entries", () => {
    expect(listEntryRoots(AUTH_PROXY, SEEN).length).toBeGreaterThan(0)
  })

  test("a folder reached through the root package is answered", () => {
    const found = [...collectExecutedDeps(AUTH_PROXY, SEEN)]
    expect(found.filter((one) => one.endsWith(REACHED))).toHaveLength(1)
  })
})
