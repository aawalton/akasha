import { expect, test } from "bun:test"
import { couldTurn } from "akasha/infrastructure/container-image/dockerfile/modules/writing/dockerfile-writing.change-generator.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const ROOT = process.cwd()

function changing(...changed: string[]): Change {
  return { root: ROOT, changed, before: () => null, after: () => null }
}

test("a change touching code, a manifest, a patch or an image could turn a Dockerfile", () => {
  expect(couldTurn(changing("a/b.code.ts"))).toBe(true)
  expect(couldTurn(changing("package.json"))).toBe(true)
  expect(couldTurn(changing("patches/one.patch"))).toBe(true)
  expect(couldTurn(changing("infrastructure/container-image/dockerfile/x/Dockerfile"))).toBe(true)
})

test("a change touching none of those writes nothing", () => {
  expect(couldTurn(changing("a/b.md", "c/d.entries.uncommitted.jsonl"))).toBe(false)
})
