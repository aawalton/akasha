import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import type { Pair } from "../spreading/move-spreading.module.code.ts"
import type { Sided } from "./move-siding.module.code.ts"
import { sidedIn } from "./move-siding.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const BODY = "export const held = 1\n"

const HELD = "akasha/one/held.module.ts"

const BESIDE = "akasha/one/held.module.code.ts"

const THERE = "akasha/two/held.module.ts"

const BESIDE_AT = "akasha/two/held.module.code.ts"

const THIRD = "akasha/three/held.module.ts"

function worldWith(named: readonly string[]): string {
  const root = scratch.rootFor("akasha-siding-")
  for (const one of named) {
    const at = join(root, one)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, BODY)
  }
  return root
}

function pairOf(from: string, to: string): Pair {
  return { from, to }
}

function refusalsOf(root: string, pairs: readonly Pair[]): readonly string[] {
  const said = sidedIn(root, pairs)
  return "refusals" in said ? said.refusals : []
}

function sidesOf(root: string, pairs: readonly Pair[]): readonly Sided[] {
  const said = sidedIn(root, pairs)
  return "sides" in said ? said.sides : []
}

test("a pair naming one path on both sides is refused", () => {
  const root = worldWith([HELD])
  expect(refusalsOf(root, [pairOf(HELD, HELD)])[0]).toContain("both sides of a pair")
})

test("a pair reaching outside the repository is refused", () => {
  const root = worldWith([HELD])
  expect(refusalsOf(root, [pairOf(HELD, "../held.module.ts")])[0]).toContain(
    "is no path inside the repository"
  )
})

test("a source that is not there is refused", () => {
  const root = worldWith([HELD])
  expect(refusalsOf(root, [pairOf("akasha/one/gone.module.ts", THERE)])[0]).toContain(
    "is not there, so there is no body to carry"
  )
})

test("a source that is no file is refused", () => {
  const root = worldWith([HELD])
  expect(refusalsOf(root, [pairOf("akasha/one", "akasha/four")])[0]).toContain("is not a file")
})

test("a destination already holding a body is refused", () => {
  const root = worldWith([HELD, THERE])
  expect(refusalsOf(root, [pairOf(HELD, THERE)])[0]).toContain("a move writes over nothing")
})

test("a path named as the source of more than one pair is refused", () => {
  const root = worldWith([HELD])
  const said = refusalsOf(root, [pairOf(HELD, THERE), pairOf(HELD, THIRD)])
  expect(said[0]).toContain("the source of more than one pair")
})

test("a path named as the destination of more than one pair is refused", () => {
  const root = worldWith([HELD, THIRD])
  const said = refusalsOf(root, [pairOf(HELD, THERE), pairOf(THIRD, THERE)])
  expect(said[0]).toContain("the destination of more than one pair")
})

test("a file beside what a pair names is carried without being named", () => {
  const root = worldWith([HELD, BESIDE])
  const said = sidesOf(root, [pairOf(HELD, THERE)])
  expect(said.map((one) => [one.from, one.to, one.named])).toEqual([
    [HELD, THERE, true],
    [BESIDE, BESIDE_AT, false],
  ])
  expect(said.every((one) => one.committed)).toBe(true)
})
