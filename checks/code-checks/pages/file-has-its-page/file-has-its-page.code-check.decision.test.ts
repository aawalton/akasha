import { afterAll, expect, test } from "bun:test"
import {
  type Claiming,
  claimingIn,
  reservedBeside,
  UNCLAIMED,
  unclaimedAt,
} from "akasha/checks/code-checks/pages/file-has-its-page/file-has-its-page.code-check.decision.code.ts"
import { claiming } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { noPathsFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

const ID = "01a04d86-434f-75ff-8000-000000000003"

const HELD = "akasha/a/held.module.ts"

const HELD_UNCOMMITTED = "akasha/a/held.module.uncommitted.ts"

const HELD_SECRET = "akasha/a/held.module.sops.yaml"

const STRAY = "akasha/a/stray.ts"

const BUILT = "akasha/a/www"

const INSIDE_BUILT = "akasha/a/www/assets/held.js"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function claims(paths: readonly string[]): Claiming {
  const held = new Set(paths)
  return (path) => held.has(path)
}

test("a path a claim covers is let through", () => {
  expect(unclaimedAt(HELD, claims([HELD]))).toEqual([])
})

test("a path no page claims is refused, and the refusal says why it matters", () => {
  expect(unclaimedAt(STRAY, claims([HELD]))).toEqual([UNCLAIMED])
  expect(UNCLAIMED).toContain("no page claims this file")
})

test("whether a page claims a path is one read of what the index files at that path", () => {
  const root = scratch.rootFor("akasha-file-has-its-page-")
  noPathsFiled(root)
  claiming(root, HELD, HELD, ID)
  const claimed = claimingIn(shadowAt(root))
  expect(claimed(HELD)).toBe(true)
  expect(claimed(STRAY)).toBe(false)
})

test("a file inside a folder a page claims is claimed by that page", () => {
  const root = scratch.rootFor("akasha-file-has-its-page-folder-")
  noPathsFiled(root)
  claiming(root, BUILT, HELD, ID)
  const claimed = claimingIn(shadowAt(root))
  expect(claimed(INSIDE_BUILT)).toBe(true)
  expect(claimed(STRAY)).toBe(false)
})

test("a file named as a page's reserved tail is answered to the page that name spells", () => {
  expect(reservedBeside(HELD_UNCOMMITTED)).toBe(HELD)
  expect(reservedBeside(HELD_SECRET)).toBe(HELD)
})

test("a file named as no reserved tail is answered nothing and asked of the index itself", () => {
  expect(reservedBeside(HELD)).toBe(null)
  expect(reservedBeside(STRAY)).toBe(null)
})

test("a reserved tail is let through by the page beside it being filed, not by itself", () => {
  const root = scratch.rootFor("akasha-file-has-its-page-reserved-")
  noPathsFiled(root)
  claiming(root, HELD, HELD, ID)
  const claimed = claimingIn(shadowAt(root))
  expect(claimed(HELD_UNCOMMITTED)).toBe(true)
  expect(claimed(HELD_SECRET)).toBe(true)
})
