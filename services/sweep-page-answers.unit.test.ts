import { afterEach, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs"
import { sweep } from "./sweep-page-answers.ts"

const DAY_MS = 24 * 60 * 60 * 1000

const MINUTE_MS = 60 * 1000

const NOW = Date.parse("2026-08-25T12:00:00.000Z")

const WHOLE = ".git/pages-answers"

const RESOLVED = ".git/pages/resolved/page-type"

const made: string[] = []

function repo(): string {
  const root = mkdtempSync("/var/tmp/sweep-page-answers-")
  made.push(root)
  mkdirSync(`${root}/${WHOLE}`, { recursive: true })
  mkdirSync(`${root}/${RESOLVED}/seat`, { recursive: true })
  return root
}

function answer(at: string, stoodFor: number): void {
  writeFileSync(at, "{}\n")
  const when = (NOW - stoodFor) / 1000
  utimesSync(at, when, when)
}

afterEach(() => {
  for (const at of made.splice(0)) rmSync(at, { recursive: true, force: true })
})

test("an answer that has stood over a day goes, whole-tree and resolved alike", () => {
  const root = repo()
  answer(`${root}/${WHOLE}/vocabulary-aaa.json`, DAY_MS + MINUTE_MS)
  answer(`${root}/${RESOLVED}/seat/bbb.json`, DAY_MS + MINUTE_MS)
  expect(sweep(root, NOW)).toBe(2)
  expect(existsSync(`${root}/${WHOLE}/vocabulary-aaa.json`)).toBe(false)
  expect(existsSync(`${root}/${RESOLVED}/seat/bbb.json`)).toBe(false)
})

test("an answer that has stood under a day stays", () => {
  const root = repo()
  answer(`${root}/${WHOLE}/vocabulary-aaa.json`, DAY_MS - MINUTE_MS)
  answer(`${root}/${RESOLVED}/seat/bbb.json`, DAY_MS - MINUTE_MS)
  expect(sweep(root, NOW)).toBe(0)
  expect(existsSync(`${root}/${WHOLE}/vocabulary-aaa.json`)).toBe(true)
  expect(existsSync(`${root}/${RESOLVED}/seat/bbb.json`)).toBe(true)
})

test("a page type left holding no answer goes with them", () => {
  const root = repo()
  answer(`${root}/${RESOLVED}/seat/bbb.json`, DAY_MS + MINUTE_MS)
  sweep(root, NOW)
  expect(existsSync(`${root}/${RESOLVED}/seat`)).toBe(false)
})

test("a page type still holding an answer stays", () => {
  const root = repo()
  answer(`${root}/${RESOLVED}/seat/bbb.json`, DAY_MS + MINUTE_MS)
  answer(`${root}/${RESOLVED}/seat/ccc.json`, DAY_MS - MINUTE_MS)
  expect(sweep(root, NOW)).toBe(1)
  expect(existsSync(`${root}/${RESOLVED}/seat`)).toBe(true)
})

test("a repo keeping no answers at all is swept without fault", () => {
  const root = mkdtempSync("/var/tmp/sweep-page-answers-bare-")
  made.push(root)
  expect(sweep(root, NOW)).toBe(0)
})
