import { afterAll, expect, test } from "bun:test"
import { noPathsFiled } from "@akasha/indexes/testing"
import { shadowAt } from "@akasha/pages/shadow"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { claiming } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  type Claiming,
  claimingIn,
  UNCLAIMED,
  unclaimedAt,
} from "./file-has-its-page.code-check.decision.code.ts"

const ID = "01a04d86-434f-75ff-8000-000000000003"

const HELD = "akasha/a/held.module.ts"

const STRAY = "akasha/a/stray.ts"

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
