import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { answeredWhole } from "./answer-cache.ts"

const MARK = "a-mark"

const KEY = "an-answer"

const VERSION = 3

function rootWithGit(): string {
  const root = mkdtempSync(join(tmpdir(), "answer-cache-"))
  mkdirSync(join(root, ".git", "pages-answers"), { recursive: true })
  return root
}

function answerPath(root: string): string {
  return join(root, ".git", "pages-answers", `${KEY}-${MARK}.json`)
}

function stored(root: string): unknown {
  return JSON.parse(readFileSync(answerPath(root), "utf8")).data
}

const same = (one: readonly string[]): readonly string[] => one

const anyOf = (one: readonly string[]): boolean => one.length > 0

function over(root: string, made: readonly string[], keep?: (one: readonly string[]) => boolean) {
  return answeredWhole(root, MARK, KEY, () => made, same, same, keep)
}

test("an answer its caller turns down is not stored, and the made one is handed back", () => {
  const root = rootWithGit()
  try {
    expect(over(root, [], anyOf)).toEqual([])
    expect(() => readFileSync(answerPath(root), "utf8")).toThrow()
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("an answer its caller keeps is stored under its mark", () => {
  const root = rootWithGit()
  try {
    expect(over(root, ["one"], anyOf)).toEqual(["one"])
    expect(stored(root)).toEqual(["one"])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("an answer standing on disk that its caller turns down is not served", () => {
  const root = rootWithGit()
  try {
    writeFileSync(answerPath(root), `${JSON.stringify({ version: VERSION, mark: MARK, data: [] })}\n`)
    expect(over(root, ["one"], anyOf)).toEqual(["one"])
    expect(stored(root)).toEqual(["one"])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a caller naming no rule keeps and serves whatever it made, empty or not", () => {
  const root = rootWithGit()
  try {
    expect(over(root, [])).toEqual([])
    expect(stored(root)).toEqual([])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
