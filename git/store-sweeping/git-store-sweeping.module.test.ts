import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { foundIn, takingFrom } from "akasha/git/store-sweeping/git-store-sweeping.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ONE = "data/reads/agent"

const TWO = "data/reads/gone"

function world(...under: readonly string[]): string {
  const at = scratch.rootFor("akasha-store-sweeping-")
  for (const one of under) {
    mkdirSync(join(at, one), { recursive: true })
    writeFileSync(join(at, one, "held.jsonl"), "{}\n")
  }
  return at
}

test("a path akasha keeps no longer is found where the folder holds that path", () => {
  const at = world(ONE)
  expect(foundIn(at, [ONE, TWO])).toEqual([
    { at: ONE, there: true },
    { at: TWO, there: false },
  ])
})

test("a path found is taken with everything under it, and one nothing is at is passed over", () => {
  const at = world(ONE)
  expect(takingFrom(at, foundIn(at, [ONE, TWO]))).toEqual({ took: [ONE], refusals: [] })
  expect(existsSync(join(at, ONE))).toBe(false)
})

test("a sweep over a folder holding none of them takes nothing", () => {
  const at = world()
  expect(takingFrom(at, foundIn(at, [ONE, TWO]))).toEqual({ took: [], refusals: [] })
})

test("what akasha keeps beside a path taken is left where it is", () => {
  const at = world(ONE, "data/reads/path")
  takingFrom(at, foundIn(at, [ONE]))
  expect(existsSync(join(at, "data/reads/path/held.jsonl"))).toBe(true)
})
