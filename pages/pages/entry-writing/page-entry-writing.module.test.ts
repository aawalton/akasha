import { expect, test } from "bun:test"
import { entriesIn } from "../entries/page-entries.module.code.ts"
import type { Value } from "../value/page-value.module.code.ts"
import {
  lineFor,
  type Part,
  partsOver,
  textOver,
  textsOver,
} from "./page-entry-writing.module.code.ts"

const PAGE = "akasha/one/held.model-test.ts"

const WIDE = 8 * 1024 * 1024

function texted(values: readonly Value[], ceiling: number): readonly string[] {
  const made = textsOver(values, ceiling)
  if ("refused" in made) throw new Error(made.refused)
  return made.texts
}

function parted(values: readonly Value[], ceiling: number): readonly Part[] {
  const made = partsOver(PAGE, "cases", "jsonl", values, ceiling)
  if ("refused" in made) throw new Error(made.refused)
  return made.parts
}

test("one value is one JSON object on one line closed by a newline", () => {
  expect(lineFor({ a: 1 })).toBe('{"a":1}\n')
})

test("a row's keys are written in the order the row carries them", () => {
  expect(lineFor({ z: 1, a: 2 })).toBe('{"z":1,"a":2}\n')
  expect(lineFor({ a: 2, z: 1 })).toBe('{"a":2,"z":1}\n')
})

test("the values of a property are written one to a line in the order handed over", () => {
  expect(textOver([{ at: 1 }, { at: 2 }])).toBe('{"at":1}\n{"at":2}\n')
})

test("a property carrying no value is written as one file holding nothing", () => {
  expect(texted([], WIDE)).toEqual([""])
})

test("values under the ceiling are written into one file", () => {
  expect(texted([{ at: 1 }, { at: 2 }], WIDE)).toEqual(['{"at":1}\n{"at":2}\n'])
})

test("values over the ceiling are divided and no file runs past it", () => {
  const made = texted([{ at: 1 }, { at: 2 }, { at: 3 }], 18)

  expect(made).toEqual(['{"at":1}\n{"at":2}\n', '{"at":3}\n'])
  for (const one of made) expect(new TextEncoder().encode(one).length).toBeLessThanOrEqual(18)
})

test("a ceiling is counted in bytes rather than in characters", () => {
  const wide = { at: "ééé" }

  expect(lineFor(wide).length).toBe(13)
  expect(new TextEncoder().encode(lineFor(wide)).length).toBe(16)
  expect(texted([wide, wide], 20).length).toBe(2)
})

test("one value running past the ceiling alone is refused rather than divided", () => {
  const made = textsOver([{ at: 1 }], 4)

  expect("refused" in made && made.refused).toContain("no value is divided")
})

test("the first file of a property carries no part section and the rest are numbered", () => {
  expect(parted([{ at: 1 }, { at: 2 }, { at: 3 }], 18).map((one) => one.path)).toEqual([
    "akasha/one/held.model-test.cases.jsonl",
    "akasha/one/held.model-test.cases.part2.jsonl",
  ])
})

test("a path that is no page file is refused rather than named", () => {
  const made = partsOver("akasha/one/held.jsonl", "cases", "jsonl", [{ at: 1 }], WIDE)

  expect("refused" in made && made.refused).toContain("no page file")
})

test("what is written here page-entries reads back in the order written", () => {
  const values: readonly Value[] = [
    { id: "a", at: 1 },
    { id: "b", at: 2 },
    { id: "c", at: 3 },
  ]
  const read: Value[] = []
  for (const one of parted(values, 18)) {
    const back = entriesIn(one.path, one.text)
    if ("refused" in back) throw new Error(back.refused)
    read.push(...back.entries)
  }

  expect(read).toEqual([...values])
})

test("a value carrying a nested record is read back as it was written", () => {
  const value: Value = { id: "a", held: { deep: [1, 2] }, said: "x" }
  const back = entriesIn("held.jsonl", textOver([value]))

  expect("entries" in back && back.entries).toEqual([value])
})
