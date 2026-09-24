import { expect, test } from "bun:test"
import {
  keyCopiedInEntries,
  keysGoingIn,
  keysGoingInEntries,
  objectOf,
  valuesWrittenAnewInEntries,
} from "akasha/change/modules/json-entries/json-entries.module.code.ts"
import ts from "typescript"
import { z } from "zod"

const AT = "held/package.json"

const HELD_BODY = z.strictObject({ name: z.string() })

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

  expect(HELD_BODY.parse(JSON.parse(said))).toEqual({ name: "@akasha/held" })
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

const SPELLING: ReadonlyMap<string, string> = new Map([
  ["ts", "typescript"],
  ["tsx", "typescript-jsx"],
])

function entriesAnew(text: string, key: string, values: ReadonlyMap<string, string>): string {
  const spans = valuesWrittenAnewInEntries(ROWS_AT, text, key, values)
  let said = text
  for (const one of [...spans].sort((here, there) => there.from - here.from)) {
    said = said.slice(0, one.from) + one.put + said.slice(one.to)
  }
  return said
}

test("a value stated as text is written anew", () => {
  expect(entriesAnew('{"id":"a","wold":"ts"}\n', "wold", SPELLING)).toBe(
    '{"id":"a","wold":"typescript"}\n'
  )
})

test("each element of a value stated as a list is written anew", () => {
  expect(entriesAnew('{"id":"b","wold":["ts","md","tsx"]}\n', "wold", SPELLING)).toBe(
    '{"id":"b","wold":["typescript","md","typescript-jsx"]}\n'
  )
})

const EFFECT_ROWS = [
  '{"id":"a","type":"apply-buff","effect":"pull-to-caster"}',
  '{"id":"b","type":"periodic-trigger","effect":{"type":"special","effect":"pull-to-caster"}}',
  "",
].join("\n")

const EFFECT_ROWS_ANEW = [
  '{"id":"a","type":"apply-buff","effect":"pull-to-the-caster"}',
  '{"id":"b","type":"periodic-trigger","effect":{"type":"special","effect":"pull-to-caster"}}',
  "",
].join("\n")

const PULLING: ReadonlyMap<string, string> = new Map([["pull-to-caster", "pull-to-the-caster"]])

test("a key of the same name nested inside an entry's value is left as it is", () => {
  expect(entriesAnew(EFFECT_ROWS, "effect", PULLING)).toBe(EFFECT_ROWS_ANEW)
})

const COUNTING: ReadonlyMap<string, string> = new Map([["2", "two"]])

test("a value stated as neither text nor a list is left as it is", () => {
  expect(valuesWrittenAnewInEntries(ROWS_AT, '{"id":"d","wold":2}\n', "wold", COUNTING)).toEqual([])
})

test("a value the caller states no new spelling for is left as it is", () => {
  expect(entriesAnew('{"id":"e","wold":"md"}\n', "wold", SPELLING)).toBe('{"id":"e","wold":"md"}\n')
})

function entriesCopied(text: string): string {
  const spans = keyCopiedInEntries(ROWS_AT, text, "wold", "weald")
  if (typeof spans === "string") throw new Error(spans)
  let said = text
  for (const one of [...spans].sort((here, there) => there.from - here.from)) {
    said = said.slice(0, one.from) + one.put + said.slice(one.to)
  }
  return said
}

test("a key named is copied under a second key straight after it, in every entry stating it", () => {
  expect(entriesCopied(ROWS)).toBe(
    [
      '{"id":"a","wold":"ts","weald":"ts","note":"kept"}',
      '{"id":"b","note":"kept"}',
      '{"id":"c","wold":"tsx","weald":"tsx"}',
      "",
    ].join("\n")
  )
})

test("an entry stating both keys with one value is passed over", () => {
  expect(keyCopiedInEntries(ROWS_AT, '{"wold":"ts","weald":"ts"}\n', "wold", "weald")).toEqual([])
})

test("an entry stating both keys with two values is refused, naming its file", () => {
  const said = keyCopiedInEntries(ROWS_AT, '{"wold":"ts","weald":"md"}\n', "wold", "weald")

  expect(typeof said === "string" ? said : "").toContain(ROWS_AT)
})
