import { expect, test } from "bun:test"
import {
  pathsRead,
  ruleIn,
  ruleWhole,
  saidAt,
  saidOf,
} from "akasha/pages/indexes/rule/index-rule.index.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

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

test("an index that has not read every typed path the index names is not whole", () => {
  const reading = readingOf({ "rule/read/at-path.jsonl": [`{"path":"${ONE}"}`] })
  expect(pathsRead(reading)).toEqual(new Set([ONE]))
  expect(ruleWhole(reading, [ONE, "held.md"])).toBe(true)
  expect(ruleWhole(reading, [ONE, TWO])).toBe(false)
  expect(ruleWhole(readingOf({}), [ONE])).toBe(false)
})
