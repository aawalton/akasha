import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { stateAt } from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import { writeState } from "akasha/alan/harness/code-editor/data-interface/modules/state-writing/state-writing.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const PAGES_AT = "alan/harness/code-editor/data-interface/pages"
const SLUG = "domain-tree"
const LINE = '{"roots":[],"unreached":[]}'
const AGAIN = '{"roots":[{"key":"a"}],"unreached":[]}'

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootMade(): string {
  const root = scratch.rootFor("state-writing-")
  mkdirSync(join(root, PAGES_AT, SLUG), { recursive: true })
  return root
}

test("a line is written where the part of the editor drawing it reads", () => {
  const root = rootMade()
  writeState(root, SLUG, LINE)
  expect(readFileSync(stateAt(root, SLUG), "utf8")).toBe(`${LINE}\n`)
})

test("a line written again replaces the line that was there", () => {
  const root = rootMade()
  writeState(root, SLUG, LINE)
  writeState(root, SLUG, AGAIN)
  expect(readFileSync(stateAt(root, SLUG), "utf8")).toBe(`${AGAIN}\n`)
})
