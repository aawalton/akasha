import { expect, test } from "bun:test"
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import { entriesAt } from "../entries/page-entries.module.code.ts"
import type { Value } from "../value/page-value.module.code.ts"
import { appendedAt, landedAt, openedAt } from "./page-entry-landing.module.code.ts"

const SCRATCH_AT = "/var/tmp"

const DIR = "akasha/one"

const PAGE = `${DIR}/held.model-test.ts`

const FIRST = `${DIR}/held.model-test.cases.jsonl`

const SECOND = `${DIR}/held.model-test.cases.part2.jsonl`

const SLUG = "cases"

const HELD = "jsonl"

const WIDE = 8 * 1024 * 1024

const NARROW = 18

const THREE: readonly Value[] = [{ at: 1 }, { at: 2 }, { at: 3 }]

function rooted(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-page-entry-landing-"))
  mkdirSync(join(root, DIR), { recursive: true })
  writeFileSync(join(root, PAGE), "export const held = {}\n")
  return root
}

function landed(root: string, values: readonly Value[], ceiling: number): readonly string[] {
  const made = landedAt(root, PAGE, SLUG, HELD, values, ceiling)
  if ("refused" in made) throw new Error(made.refused)
  return made.paths
}

function appended(root: string, values: readonly Value[], ceiling: number): readonly string[] {
  const made = appendedAt(root, PAGE, SLUG, HELD, values, ceiling)
  if ("refused" in made) throw new Error(made.refused)
  return made.paths
}

function readBack(root: string): readonly Value[] {
  const read = entriesAt(root, PAGE, SLUG, HELD)
  if ("refused" in read) throw new Error(read.refused)
  return read.entries
}

test("a property's values land in the files page-entry-writing names, made where absent", () => {
  const root = rooted()

  expect(landed(root, THREE, NARROW)).toEqual([FIRST, SECOND])
  expect(existsSync(join(root, FIRST))).toBe(true)
  expect(existsSync(join(root, SECOND))).toBe(true)
})

test("what is written here page-entries reads back in the order written", () => {
  const root = rooted()
  landed(root, THREE, NARROW)

  expect(readBack(root)).toEqual([...THREE])
})

test("a file already holding what would be written is left alone and named nowhere", () => {
  const root = rooted()
  landed(root, THREE, NARROW)

  expect(landed(root, THREE, NARROW)).toEqual([])
})

test("a file numbered past the last file written is taken away and named in the answer", () => {
  const root = rooted()
  landed(root, THREE, NARROW)

  expect(landed(root, [{ at: 1 }], WIDE)).toEqual([FIRST, SECOND])
  expect(existsSync(join(root, SECOND))).toBe(false)
  expect(readBack(root)).toEqual([{ at: 1 }])
})

test("a property carrying no value is written as one file holding nothing", () => {
  const root = rooted()

  expect(landed(root, [], WIDE)).toEqual([FIRST])
  expect(readFileSync(join(root, FIRST), "utf8")).toBe("")
  expect(readBack(root)).toEqual([])
})

test("appending adds to the last numbered file rather than rewriting that file", () => {
  const root = rooted()
  landed(root, [{ at: 1 }, { at: 2 }], WIDE)

  expect(appended(root, [{ at: 3 }], WIDE)).toEqual([FIRST])
  expect(readFileSync(join(root, FIRST), "utf8")).toBe('{"at":1}\n{"at":2}\n{"at":3}\n')
  expect(existsSync(join(root, SECOND))).toBe(false)
})

test("the bytes already in a file count toward the ceiling and a value rolls on", () => {
  const root = rooted()
  landed(root, [{ at: 1 }], WIDE)

  expect(appended(root, [{ at: 2 }], 12)).toEqual([SECOND])
  expect(readBack(root)).toEqual([{ at: 1 }, { at: 2 }])
})

test("a file's fill is read from that file's size rather than from that file's text", () => {
  const root = rooted()
  writeFileSync(join(root, FIRST), "x".repeat(20))

  expect(appended(root, [{ at: 2 }], 25)).toEqual([SECOND])
})

test("appending one value at a time divides the files as writing every value at once does", () => {
  const at = rooted()
  const over = rooted()
  landed(at, THREE, NARROW)
  for (const one of THREE) appended(over, [one], NARROW)

  expect(readdirSync(join(over, DIR)).sort()).toEqual(readdirSync(join(at, DIR)).sort())
  expect(readFileSync(join(over, FIRST), "utf8")).toBe(readFileSync(join(at, FIRST), "utf8"))
  expect(readFileSync(join(over, SECOND), "utf8")).toBe(readFileSync(join(at, SECOND), "utf8"))
})

test("one value running past the ceiling alone is refused rather than divided", () => {
  const root = rooted()
  const over = appendedAt(root, PAGE, SLUG, HELD, [{ at: 1 }], 4)
  const whole = landedAt(root, PAGE, SLUG, HELD, [{ at: 1 }], 4)

  expect("refused" in over && over.refused).toContain("no value is divided")
  expect("refused" in whole && whole.refused).toContain("no value is divided")
})

test("writing beside a page that is not there is refused, naming that page", () => {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-page-entry-landing-bare-"))
  const whole = landedAt(root, PAGE, SLUG, HELD, THREE, WIDE)
  const more = appendedAt(root, PAGE, SLUG, HELD, THREE, WIDE)
  const opened = openedAt(root, PAGE, SLUG, HELD)

  expect("refused" in whole && whole.refused).toContain(PAGE)
  expect("refused" in more && more.refused).toContain(PAGE)
  expect("refused" in opened && opened.refused).toContain(PAGE)
  expect(existsSync(join(root, DIR))).toBe(false)
})

test("a path that is no page file is refused rather than named", () => {
  const root = rooted()
  const stray = `${DIR}/held.jsonl`
  writeFileSync(join(root, stray), "")
  const made = appendedAt(root, stray, SLUG, HELD, THREE, WIDE)

  expect("refused" in made && made.refused).toContain("no page file")
})

test("no id is minted and no value is judged against a shape", () => {
  const root = rooted()
  const odd: Value = { said: "no id here", deep: { held: [1, 2] } }
  landed(root, [odd], WIDE)

  expect(readBack(root)).toEqual([odd])
})

test("nothing beside the page but that property's files is made", () => {
  const root = rooted()
  landed(root, THREE, NARROW)

  expect(readdirSync(root)).toEqual(["akasha"])
  expect(readdirSync(join(root, DIR)).sort()).toEqual(
    [
      "held.model-test.cases.jsonl",
      "held.model-test.cases.part2.jsonl",
      "held.model-test.ts",
    ].sort()
  )
})
