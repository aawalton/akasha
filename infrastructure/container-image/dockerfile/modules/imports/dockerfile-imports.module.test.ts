import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  collectExecutedDeps,
  listEntryRoots,
  seenIn,
} from "akasha/infrastructure/container-image/dockerfile/modules/imports/dockerfile-imports.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const AUTH_PROXY = "infrastructure/network/auth-proxy"
const REACHED = "/require-env"
const ROOT = process.cwd()

function onDisk(path: string): Uint8Array | null {
  const at = join(ROOT, path)
  return existsSync(at) ? readFileSync(at) : null
}

const SEEN = seenIn(
  { root: ROOT, changed: [], before: onDisk, after: onDisk },
  shadowAt(ROOT).index
)

describe("what a service reaches", () => {
  test("a service holding no src folder answers its own files as entries", () => {
    expect(listEntryRoots(AUTH_PROXY, SEEN).length).toBeGreaterThan(0)
  })

  test("a folder reached through the root package is answered", () => {
    const found = [...collectExecutedDeps(AUTH_PROXY, SEEN)]
    expect(found.filter((one) => one.endsWith(REACHED))).toHaveLength(1)
  })
})
