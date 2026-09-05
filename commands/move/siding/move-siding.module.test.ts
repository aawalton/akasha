import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as gitIn } from "@akasha/git/git-running"
import { rebuiltIn } from "@akasha/indexes/testing"
import { declaringUnder } from "@akasha/testing-system/declaring"
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

const TREE = "akasha"

const PAGE = "akasha/one/held.module.ts"

const CLAIMED = "akasha/one/held.module.code.ts"

const CLAIMED_AT = "akasha/one/renamed.module.code.ts"

const PAGE_BODY = `export const held = {
  id: "01a07208-15e6-7d2c-8eaf-f75a94c6b98a",
  pageTypeSlug: "module",
  slug: "held",
  definition: "a page a test files in its index",
}
`

const PLAIN = "tools/lib/plain.ts"

const PLAIN_AT = "tools/lib/renamed.ts"

const STEM = "tools/lib/a.b.ts"

const STEM_SIBLING = "tools/lib/a.b.c.ts"

const STEM_AT = "tools/lib/under/a.b.ts"

function worldWith(named: readonly string[]): string {
  const root = scratch.rootFor("akasha-siding-")
  for (const one of named) {
    const at = join(root, one)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, BODY)
  }
  return root
}

function indexedWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-siding-")
  gitIn(root, ["init", "--quiet"])
  for (const [path, body] of Object.entries({ ...declaringUnder(TREE), ...named })) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  rebuiltIn(root, TREE)
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

test("a file no page claims is carried to a new name and no slug is renamed", () => {
  const root = indexedWith({ [PLAIN]: BODY })
  expect(refusalsOf(root, [pairOf(PLAIN, PLAIN_AT)])).toEqual([])
  const said = sidesOf(root, [pairOf(PLAIN, PLAIN_AT)])
  expect(said.map((one) => [one.from, one.to])).toEqual([[PLAIN, PLAIN_AT]])
  expect(said[0]?.renaming).toBeNull()
})

test("a file a page claims beside it is refused a new name", () => {
  const root = indexedWith({ [PAGE]: PAGE_BODY, [CLAIMED]: BODY })
  const said = refusalsOf(root, [pairOf(CLAIMED, CLAIMED_AT)])
  expect(said[0]).toContain(`${CLAIMED} is a file \`${PAGE}\` claims beside it`)
})

test("a file no page claims carries no sibling that merely shares its stem", () => {
  const root = indexedWith({ [STEM]: BODY, [STEM_SIBLING]: BODY })
  expect(refusalsOf(root, [pairOf(STEM, STEM_AT)])).toEqual([])
  expect(sidesOf(root, [pairOf(STEM, STEM_AT)]).map((one) => one.from)).toEqual([STEM])
})
