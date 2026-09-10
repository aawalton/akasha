import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { listedFiled, pageFiled } from "@akasha/indexes/testing"
import { bytesOf } from "@akasha/testing-system/bodying"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { said as git } from "../../../../git/git-running/git-running.module.code.ts"
import { founded, put, typed } from "../../../modules/scratch/check-scratch.module.code.ts"
import { identifierNamesOnePage } from "./identifier-names-one-page.code-check.audit.code.ts"

const CHECK = "check"

const ONE = "01a04f76-7430-7011-8000-000000000011"

const TWO = "01a04f76-7430-7012-8000-000000000012"

const ONE_AT = "akasha/one.check.ts"

const TWO_AT = "akasha/two.check.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function body(slug: string, id: string): Uint8Array {
  return bytesOf(
    `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: "check", ` +
      `slug: ${JSON.stringify(slug)} }\n`
  )
}

function rooted(): string {
  const root = scratch.rootFor("akasha-identifier-audit-")
  founded(root)
  typed(root, "page-type", "page")
  typed(root, CHECK, "page")
  mkdirSync(join(root, "akasha"), { recursive: true })
  pageFiled(root, ONE, ONE_AT)
  pageFiled(root, TWO, TWO_AT)
  return root
}

function treed(root: string): string {
  git(root, ["init", "--quiet"])
  git(root, ["add", "-A"])
  return root
}

test("an audit judges every page in the tree, no change naming any of them", () => {
  const root = rooted()
  put(root, ONE_AT, body("held", ONE))
  put(root, TWO_AT, body("held", TWO))
  listedFiled(root, CHECK, "held", [
    { path: ONE_AT, id: ONE },
    { path: TWO_AT, id: TWO },
  ])
  const said = identifierNamesOnePage(treed(root))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(TWO_AT)
  expect(said[0]?.reason).toContain(ONE_AT)
  expect(said[0]?.reason).toContain("check/slug/held")
})

test("an audit lets through a tree where each page's identifiers are its own", () => {
  const root = rooted()
  put(root, ONE_AT, body("one", ONE))
  put(root, TWO_AT, body("two", TWO))
  listedFiled(root, CHECK, "one", [{ path: ONE_AT, id: ONE }])
  listedFiled(root, CHECK, "two", [{ path: TWO_AT, id: TWO }])
  expect(identifierNamesOnePage(treed(root))).toEqual([])
})
