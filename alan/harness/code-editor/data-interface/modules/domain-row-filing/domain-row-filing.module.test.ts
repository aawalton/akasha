import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  domainRowsAt,
  keptFor,
} from "akasha/alan/harness/code-editor/data-interface/modules/domain-row-filing/domain-row-filing.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import { landing } from "akasha/command/modules/landing/landing.module.code.ts"
import {
  scratch as repos,
  repoWith,
} from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const scratch = scratchWorld()

afterAll(repos.sweep)

function changeOn(root: string): Change {
  return { root, base: "", changed: [], before: () => null, after: () => null }
}

test("a repository with no page holds no row and asks for no change", () => {
  const root = scratch.rootFor("akasha-rows-")

  const said = keptFor(changeOn(root), readingIn(root), false)

  expect(said.rows).toEqual([])
  expect(said.edits).toEqual([])
})

test("a filed line not shaped as a row is read by reading every page once", () => {
  const root = scratch.rootFor("akasha-rows-")
  const at = join(
    root,
    "alan/harness/code-editor/data-interface/pages/domain-tree/" +
      "domain-tree.code-editor-data-interface.rows.uncommitted.jsonl"
  )
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify({ path: 1 })}\n`)

  const said = keptFor(changeOn(root), readingIn(root), false)

  expect(said.rows).toEqual([])
})

const rowAt = (page: string, parts: readonly string[]): string =>
  JSON.stringify({ path: `${page}.domain.ts`, id: page, parts, champions: null, drawn: true })

const A = rowAt("a", [])

const C = rowAt("c", [])

test("a landing overlapping another keeps the rows the other filed rather than writing back what it read", async () => {
  const was = `${A}\n${rowAt("b", [])}\n${C}\n`
  const root = repoWith({ ".gitignore": "*.uncommitted.*\n", [domainRowsAt()]: was })
  const overlapping: Judging = {
    named: ["overlapping"],
    checksFor: () => ["overlapping"],
    over: async () => {
      writeFileSync(join(root, domainRowsAt()), `${A}\n${rowAt("c", ["x"])}\n`)
      return []
    },
  }
  const mine = `${A}\n${rowAt("b", [])}\n${rowAt("bb", [])}\n${C}\n`
  const rows: readonly FileChange[] = [
    { kind: "replace", path: domainRowsAt(), contentFrom: was, contentTo: mine },
  ]

  expect("refusals" in (await landing(root, rows, "mine", overlapping))).toBe(false)
  expect(readFileSync(join(root, domainRowsAt()), "utf8")).toBe(
    `${A}\n${rowAt("bb", [])}\n${rowAt("c", ["x"])}\n`
  )
})

test("a reading with no row file is read whole rather than refused", () => {
  const root = scratch.rootFor("akasha-rows-")

  const said = keptFor(changeOn(root), readingIn(root), true)

  expect(said.edits).toEqual([])
})
