import { expect, test } from "bun:test"
import { couldTurn } from "akasha/infrastructure/container-image/dockerfile/modules/writing/dockerfile-writing.change-generator.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const ROOT = process.cwd()

function changing(...changed: string[]): Change {
  return { root: ROOT, changed, before: () => null, after: () => null }
}

test("a change touching what a Dockerfile copies, a patch or an image could turn one", () => {
  expect(couldTurn(changing("infrastructure/network/auth-proxy/one.module.code.ts"))).toBe(true)
  expect(couldTurn(changing("package.json"))).toBe(true)
  expect(couldTurn(changing("patches/one.patch"))).toBe(true)
  expect(couldTurn(changing("infrastructure/container-image/dockerfile/x/Dockerfile"))).toBe(true)
})

test("a change touching none of those writes nothing", () => {
  expect(couldTurn(changing("nowhere/b.code.ts", "c/d.entries.uncommitted.jsonl"))).toBe(false)
})
