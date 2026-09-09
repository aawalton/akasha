import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { everyPath } from "@akasha/indexes"
import { noPathsFiled } from "@akasha/indexes/testing"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { claiming } from "../../../modules/scratch/check-scratch.module.code.ts"
import { fileHasItsPage } from "./file-has-its-page.code-check.audit.code.ts"
import { UNCLAIMED } from "./file-has-its-page.code-check.decision.code.ts"

const ID = "01a04d86-434f-75ff-8000-000000000004"

const HELD = "akasha/a/held.module.ts"

const STRAY = "akasha/a/stray.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function bodyAt(root: string, path: string): undefined {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, "held\n")
  return undefined
}

function treed(paths: readonly string[]): string {
  const root = scratch.rootFor("akasha-file-has-its-page-audit-")
  git(root, ["init", "--quiet"])
  noPathsFiled(root)
  for (const path of paths) bodyAt(root, path)
  git(root, ["add", "-A"])
  return root
}

test("an audit judges a file in the tree the index names no path for", () => {
  const root = treed([HELD, STRAY])
  claiming(root, HELD, HELD, ID)
  expect(everyPath(root)).toEqual([HELD])
  expect(fileHasItsPage(root)).toEqual([{ path: STRAY, reason: UNCLAIMED }])
})

test("no file in the tree is exempt by where it sits or what it is named", () => {
  const root = treed([HELD, "README.md"])
  claiming(root, HELD, HELD, ID)
  expect(fileHasItsPage(root).map((one) => one.path)).toEqual(["README.md"])
})

test("an audit reads the tree and the index under the root it was given, and no other", () => {
  const named = treed([HELD])
  claiming(named, HELD, HELD, ID)
  const bare = treed([HELD])
  expect(fileHasItsPage(named)).toEqual([])
  expect(fileHasItsPage(bare)).toEqual([{ path: HELD, reason: UNCLAIMED }])
})
