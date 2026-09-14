import { expect, test } from "bun:test"
import {
  keysGoingIn,
  keysGoingInEntries,
  objectOf,
} from "akasha/changes/modules/json-entries/json-entries.module.code.ts"
import ts from "typescript"

const AT = "held/package.json"

const BODY = [
  "{",
  '  "name": "@akasha/held",',
  '  "exports": {',
  '    "./one": "./one/one.module.code.ts",',
  '    "./two": "./two/two.module.code.ts",',
  '    "./three": "./three/three.module.code.ts"',
  "  }",
  "}",
  "",
].join("\n")

test("the body's own top-level object is answered apart from any key it holds", () => {
  expect(objectOf(ts.parseJsonText(AT, BODY))?.properties.length).toBe(2)
  expect(objectOf(ts.parseJsonText(AT, "[1, 2]\n"))).toBeNull()
})

test("a key of the top-level object is dropped the way an entry under a key is", () => {
  const spans = keysGoingIn(AT, BODY, new Set(["exports"]))
  let said = BODY
  for (const one of [...spans].sort((here, there) => there.from - here.from)) {
    said = said.slice(0, one.from) + one.put + said.slice(one.to)
  }

  expect(JSON.parse(said)).toEqual({ name: "@akasha/held" })
})

test("a key the top-level object does not hold is dropped from nowhere", () => {
  expect(keysGoingIn(AT, BODY, new Set(["nothing"]))).toEqual([])
  expect(keysGoingIn(AT, "[1, 2]\n", new Set(["exports"]))).toEqual([])
})

const ROWS_AT = "akasha/months/one.month.tallies.jsonl"

const ROWS = [
  '{"id":"a","wold":"ts","note":"kept"}',
  '{"id":"b","note":"kept"}',
  '{"id":"c","wold":"tsx"}',
  "",
].join("\n")

function entriesWithout(text: string, dropping: readonly string[]): string {
  const spans = keysGoingInEntries(ROWS_AT, text, new Set(dropping))
  let said = text
  for (const one of [...spans].sort((here, there) => there.from - here.from)) {
    said = said.slice(0, one.from) + one.put + said.slice(one.to)
  }
  return said
}

test("a key named goes from every entry of a body of entries that states it", () => {
  expect(entriesWithout(ROWS, ["wold"])).toBe(
    ['{"id":"a","note":"kept"}', '{"id":"b","note":"kept"}', '{"id":"c"}', ""].join("\n")
  )
})

test("an entry stating no such key is left as that entry is", () => {
  expect(entriesWithout(ROWS, ["nothing"])).toBe(ROWS)
})

test("a passage over an entry is placed against the whole body", () => {
  const spans = keysGoingInEntries(ROWS_AT, ROWS, new Set(["wold"]))
  const last = spans[spans.length - 1]

  expect(last !== undefined && last.from > ROWS.indexOf("\n")).toBe(true)
})

test("a line holding nothing but space is passed over", () => {
  expect(keysGoingInEntries(ROWS_AT, "\n  \n", new Set(["wold"]))).toEqual([])
})
