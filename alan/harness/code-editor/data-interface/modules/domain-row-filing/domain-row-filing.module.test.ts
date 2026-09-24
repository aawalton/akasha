import { expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { keptFor } from "akasha/alan/harness/code-editor/data-interface/modules/domain-row-filing/domain-row-filing.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const scratch = scratchWorld()

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

test("a reading with no row file is read whole rather than refused", () => {
  const root = scratch.rootFor("akasha-rows-")

  const said = keptFor(changeOn(root), readingIn(root), true)

  expect(said.edits).toEqual([])
})
