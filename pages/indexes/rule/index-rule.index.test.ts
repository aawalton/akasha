import { afterAll, expect, test } from "bun:test"
import { scratch } from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import {
  unreadAfterRebuild,
  wholeAfterRebuild,
} from "akasha/pages/indexes/indexing/indexing.module.test-fixtures.ts"
import {
  pathsRead,
  readAt,
  readerFiled,
  readerIn,
  readerNow,
  ruleIn,
  ruleWhole,
  saidAt,
  saidOf,
} from "akasha/pages/indexes/rule/index-rule.index.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

afterAll(scratch.sweep, 5000)

const ROOT = "/repo"

const ONE = "one.ts"

const TWO = "two.ts"

const BODY = `function held(one: string): string {
  return one.padEnd(80, " ")
}

function beside(two: string): string {
  return two.padEnd(80, " ")
}
`

const FORWARDS = `function passing(one: string): string {
  return held(one)
}
`

function readingOf(lines: Readonly<Record<string, readonly string[]>>): Reading {
  return {
    holds: (at) => at === "" || Object.keys(lines).some((one) => one.startsWith(at)),
    listing: () => [],
    lines: (at) => lines[at] ?? [],
    read: () => null,
  }
}

test("a path read for rules is filed whether or not that path spells one", () => {
  const filed = ruleIn(FORWARDS, `${ROOT}/${ONE}`, ROOT)
  expect(filed.map((one) => one.at)).toEqual(["rule/read/at-path.jsonl"])
  expect(filed[0]?.line).toBe(`{"path":"${ONE}"}`)
})

test("a body that is not ts or tsx is filed nowhere", () => {
  expect(ruleIn(BODY, `${ROOT}/held.md`, ROOT)).toEqual([])
})

test("a path with no body is filed as read, and a path that is not ts or tsx is not", () => {
  expect(readAt(`${ROOT}/${ONE}`, ROOT)).toEqual([
    { at: "rule/read/at-path.jsonl", line: `{"path":"${ONE}"}` },
  ])
  expect(readAt(`${ROOT}/held.md`, ROOT)).toEqual([])
  expect(ruleIn(FORWARDS, `${ROOT}/${ONE}`, ROOT)).toEqual(readAt(`${ROOT}/${ONE}`, ROOT))
})

test("a line has the path, the place, and the name, and two files share one said file", () => {
  const one = ruleIn(BODY, `${ROOT}/${ONE}`, ROOT)
  const two = ruleIn(BODY, `${ROOT}/${TWO}`, ROOT)
  expect(one.length).toBe(3)
  expect(one[1]?.line).toBe(`{"path":"${ONE}","place":0,"name":"held"}`)
  expect(one[2]?.line).toBe(`{"path":"${ONE}","place":1,"name":"beside"}`)
  expect(one[1]?.at).toBe(two[1]?.at)
  expect(one[1]?.at).toBe(one[2]?.at)
})

test("a reader answers the paths for one rule ordered by path and then by place", () => {
  const reading = readingOf({
    [saidAt("held")]: [
      `{"path":"${TWO}","place":1,"name":"d"}`,
      `{"path":"${TWO}","place":0,"name":"c"}`,
      `{"path":"${ONE}","place":1,"name":"b"}`,
    ],
  })
  expect(saidOf(reading, "held").map((one) => one.name)).toEqual(["b", "c", "d"])
  expect(saidOf(reading, "elsewhere")).toEqual([])
})

function filedBy(reader: string): Reading {
  return readingOf({
    "rule/read/at-path.jsonl": [`{"path":"${ONE}"}`],
    "rule/read/by-reader.jsonl": [JSON.stringify({ reader })],
  })
}

test("an index that has not read every typed path the index names is not whole", () => {
  const reading = filedBy(readerNow())
  expect(pathsRead(reading)).toEqual(new Set([ONE]))
  expect(ruleWhole(reading, [ONE, "held.md"])).toBe(true)
  expect(ruleWhole(reading, [ONE, TWO])).toBe(false)
  expect(ruleWhole(readingOf({}), [ONE])).toBe(false)
})

test("a map another reader filed is not whole though every path it names was read", () => {
  const reading = filedBy("the rules some other reader spelled")
  expect(pathsRead(reading)).toEqual(new Set([ONE]))
  expect(readerFiled(reading)).toBe("the rules some other reader spelled")
  expect(ruleWhole(reading, [ONE])).toBe(false)
})

test("a map naming no reader is not whole", () => {
  const reading = readingOf({ "rule/read/at-path.jsonl": [`{"path":"${ONE}"}`] })
  expect(readerFiled(reading)).toBe(null)
  expect(ruleWhole(reading, [ONE])).toBe(false)
})

test("the reader names itself by what that reader spells for its own body", () => {
  expect(readerNow()).toMatch(/^[0-9a-f]{64}$/)
  expect(readerIn().at).toBe("rule/read/by-reader.jsonl")
  expect(readerFiled(readingOf({ [readerIn().at]: [readerIn().line] }))).toBe(readerNow())
})

test("a rebuild leaves no typed path it names unread, so the rules it filed are read", () => {
  expect(unreadAfterRebuild()).toEqual([])
  expect(wholeAfterRebuild()).toBe(true)
})
