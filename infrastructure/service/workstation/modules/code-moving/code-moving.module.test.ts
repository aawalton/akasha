import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { PINNED_AT } from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import { storeIn, TREES } from "akasha/file/modules/git-place/git-place.module.code.ts"
import {
  codeMoved,
  commitAt,
  kindOf,
  movedFrom,
  saidOfMoved,
  stampAt,
} from "akasha/infrastructure/service/workstation/modules/code-moving/code-moving.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const A_KIND = "held-kind"

const ONE_COMMIT = "1111111111111111111111111111111111111111"

const TWO_COMMIT = "2222222222222222222222222222222222222222"

const CHECKOUT = mkdtempSync("/var/tmp/code-moving-")

afterAll(() => rmSync(CHECKOUT, { recursive: true, force: true }))

function laidDown(at: string, text: string): string {
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, text)
  return at
}

test("the tree a path came out of is the folder directly under the trees git holds", () => {
  const deep = join(storeIn(CHECKOUT, TREES), A_KIND, "one", "two")
  expect(kindOf(deep, CHECKOUT)).toBe(A_KIND)
  expect(kindOf(join(storeIn(CHECKOUT, TREES), A_KIND), CHECKOUT)).toBe(A_KIND)
})

test("a path outside the trees came out of no tree", () => {
  expect(kindOf(join(CHECKOUT, "one", "two"), CHECKOUT)).toBe(null)
  expect(kindOf(storeIn(CHECKOUT, TREES), CHECKOUT)).toBe(null)
  expect(kindOf(join(codeRoot(), "one"), CHECKOUT)).toBe(null)
})

test("a tree's commit is read out of the stamp at the root of that tree", () => {
  const at = stampAt(CHECKOUT, A_KIND)
  expect(at).toBe(join(storeIn(CHECKOUT, TREES), A_KIND, PINNED_AT))
  laidDown(at, `${ONE_COMMIT}\n`)
  expect(commitAt(at)).toBe(ONE_COMMIT)
})

test("a tree of another kind is read off a stamp of its own", () => {
  laidDown(stampAt(CHECKOUT, "another-kind"), `${TWO_COMMIT}\n`)
  expect(commitAt(stampAt(CHECKOUT, "another-kind"))).toBe(TWO_COMMIT)
  expect(commitAt(stampAt(CHECKOUT, A_KIND))).toBe(ONE_COMMIT)
})

test("a commit no file gives back is no commit", () => {
  expect(commitAt(join(CHECKOUT, "not-there"))).toBe(null)
  expect(commitAt(laidDown(join(CHECKOUT, "blank"), "  \n"))).toBe(null)
})

test("code has moved only where two commits are both read and differ", () => {
  expect(movedFrom(ONE_COMMIT, TWO_COMMIT)).toEqual({ from: ONE_COMMIT, to: TWO_COMMIT })
  expect(movedFrom(ONE_COMMIT, ONE_COMMIT)).toBe(null)
  expect(movedFrom(null, TWO_COMMIT)).toBe(null)
  expect(movedFrom(ONE_COMMIT, null)).toBe(null)
  expect(movedFrom(null, null)).toBe(null)
})

test("what is said on the way out names both commits and the exit it leaves on", () => {
  const said = saidOfMoved({ from: ONE_COMMIT, to: TWO_COMMIT })
  expect(said).toContain(ONE_COMMIT)
  expect(said).toContain(TWO_COMMIT)
  expect(said).toContain("79")
})

test("code running out of no tree never moves, so a test is never left", () => {
  expect(kindOf(import.meta.dir, codeRoot())).toBe(null)
  expect(codeMoved()).toBe(null)
})
