import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { keptRowsIn } from "akasha/page/service/modules/kept-rows/kept-rows.module.code.ts"

const ROOT = mkdtempSync(join("/var/tmp", "kept-rows-"))

const PAGE = "akasha/a.thing.ts"

const FIRST = "akasha/a.thing.rows.uncommitted.jsonl"

const SECOND = "akasha/a.thing.rows.part2.uncommitted.jsonl"

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

function kept(given: readonly unknown[], root: string = ROOT) {
  return keptRowsIn(root, PAGE, { key: "rows", propertySlug: "rows" }, given)
}

test("rows fill a file kept beside the page, named by the ending `jsonl`", () => {
  expect(kept([{ id: "one", at: 1 }])).toEqual({
    ending: "jsonl",
    puts: [{ path: FIRST, content: '{"id":"one","at":1}\n' }],
    removes: [],
  })
})

test("a row arriving without an id is given one", () => {
  const said = kept([{ at: 1 }])
  const line = "puts" in said ? (said.puts[0]?.content ?? "") : ""
  expect(JSON.parse(line)).toEqual({ id: expect.stringMatching(/^[0-9a-f-]{36}$/), at: 1 })
})

test("a row handed over that is no object is refused", () => {
  expect(kept(["one"])).toEqual({
    refused: "`rows` keeps its values as rows, and a row handed over is no object",
  })
})

test("a numbered file the rows no longer fill is taken away", () => {
  const root = join(ROOT, "numbered")
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, FIRST), "{}\n")
  writeFileSync(join(root, SECOND), "{}\n")
  expect(kept([{ id: "one" }], root)).toMatchObject({ removes: [SECOND] })
})
