import { expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { entriesAt } from "../entries/page-entries.module.code.ts"
import { landedAt } from "../entry-landing/page-entry-landing.module.code.ts"
import type { Value } from "../value/page-value.module.code.ts"
import { type Queue, queueAt } from "./page-entry-queue.module.code.ts"

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
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-page-entry-queue-"))
  mkdirSync(join(root, DIR), { recursive: true })
  writeFileSync(join(root, PAGE), "export const held = {}\n")
  return root
}

function queued(root: string, ceiling: number): Queue {
  const made = queueAt(root, PAGE, SLUG, HELD, ceiling)
  if ("refused" in made) throw new Error(made.refused)
  return made.queue
}

function readBack(root: string): readonly Value[] {
  const read = entriesAt(root, PAGE, SLUG, HELD)
  if ("refused" in read) throw new Error(read.refused)
  return read.entries
}

test("a value is on the disk only after the call handing that value over has returned", async () => {
  const root = rooted()
  const queue = queued(root, WIDE)
  for (const one of THREE) queue.write(one)

  expect(existsSync(join(root, FIRST))).toBe(false)
  await queue.flushed()
  expect(readBack(root)).toEqual([...THREE])
})

test("values handed over in one turn reach one file in one append", async () => {
  const root = rooted()
  const queue = queued(root, WIDE)
  queue.write({ at: 1 })
  const first = queue.flushed()
  queue.write({ at: 2 })
  const second = queue.flushed()

  expect(second).toBe(first)
  await second
  queue.write({ at: 3 })
  expect(queue.flushed()).not.toBe(first)
  await queue.flushed()
  expect(readFileSync(join(root, FIRST), "utf8")).toBe('{"at":1}\n{"at":2}\n{"at":3}\n')
})

test("values reach the disk in the order the values were handed over", async () => {
  const root = rooted()
  const queue = queued(root, WIDE)
  const many: Value[] = []
  for (let at = 0; at < 200; at += 1) many.push({ at })
  for (const one of many) {
    queue.write(one)
    await Promise.resolve()
  }
  await queue.flushed()

  expect(readBack(root)).toEqual(many)
})

test("which file a value lands in is settled as page-entry-landing settles it", async () => {
  const root = rooted()
  const over = rooted()
  const queue = queued(root, NARROW)
  for (const one of THREE) queue.write(one)

  expect(queue.at()).toBe(SECOND)
  await queue.flushed()
  landedAt(over, PAGE, SLUG, HELD, THREE, NARROW)
  expect(readFileSync(join(root, FIRST), "utf8")).toBe(readFileSync(join(over, FIRST), "utf8"))
  expect(readFileSync(join(root, SECOND), "utf8")).toBe(readFileSync(join(over, SECOND), "utf8"))
})

test("a value handed over after a refusal is written rather than dropped", async () => {
  const root = rooted()
  const queue = queued(root, NARROW)
  queue.write({ said: "a".repeat(20) })
  queue.write({ at: 1 })
  await queue.flushed()

  expect(queue.refused()).toContain("no value is divided")
  expect(readBack(root)).toEqual([{ at: 1 }])
})

test("a value that cannot be turned into JSON is refused last rather than thrown", async () => {
  const root = rooted()
  const queue = queued(root, NARROW)
  const circular: Value = {}
  circular["self"] = circular
  queue.write({ said: "a".repeat(20) })
  queue.write(circular)
  queue.write({ at: 1 })
  await queue.flushed()

  expect(queue.refused()).toContain("no value reached")
  expect(readBack(root)).toEqual([{ at: 1 }])
})

test("flushed resolves rather than rejects where a write is refused", async () => {
  const root = rooted()
  mkdirSync(join(root, FIRST))
  const queue = queued(root, WIDE)
  queue.write({ at: 1 })
  await queue.flushed()

  expect(queue.refused()).toContain(FIRST)
})

test("a queue beside a page that is not there is refused rather than made", () => {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-page-entry-queue-bare-"))
  const made = queueAt(root, PAGE, SLUG, HELD, WIDE)

  expect("refused" in made && made.refused).toContain(PAGE)
  expect(existsSync(join(root, DIR))).toBe(false)
})

test("at names the last of the numbered files this queue writes into", async () => {
  const root = rooted()
  const queue = queued(root, NARROW)

  expect(queue.at()).toBe(FIRST)
  for (const one of THREE) queue.write(one)
  expect(queue.at()).toBe(SECOND)
  await queue.flushed()
})

test("nothing waits on the disk while a value is handed over", async () => {
  const root = rooted()
  const queue = queued(root, WIDE)
  const from = performance.now()
  for (let at = 0; at < 5000; at += 1) queue.write({ at })
  const took = performance.now() - from

  expect(existsSync(join(root, FIRST))).toBe(false)
  expect(took).toBeLessThan(500)
  await queue.flushed()
  expect(readBack(root).length).toBe(5000)
})

test("a queue made over a file already holding values adds to that file", async () => {
  const root = rooted()
  landedAt(root, PAGE, SLUG, HELD, [{ at: 1 }], WIDE)
  const queue = queued(root, WIDE)
  queue.write({ at: 2 })
  await queue.flushed()

  expect(readBack(root)).toEqual([{ at: 1 }, { at: 2 }])
})
