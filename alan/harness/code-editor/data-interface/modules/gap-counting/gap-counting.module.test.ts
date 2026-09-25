import { expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import {
  gapCountIn,
  gapPictureAt,
} from "akasha/alan/harness/code-editor/data-interface/modules/gap-counting/gap-counting.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

function row(key: string, gaps: number): Record<string, unknown> {
  return { key, label: key, at: null, color: null, gaps, children: [] }
}

test("the gaps counted are the gaps the picture on disk hangs", () => {
  const root = scratch.rootFor("akasha-gap-counting-")
  const at = gapPictureAt(root)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify({ roots: [row("one", 2), row("two", 3)], unreached: [] })}\n`)

  expect(gapCountIn(root)).toBe(5)
})

test("a repository with no picture counts the gaps its pages state", () => {
  const root = scratch.rootFor("akasha-gap-counting-")

  expect(gapCountIn(root)).toBe(0)
})
