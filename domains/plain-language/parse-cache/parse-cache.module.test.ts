import { afterEach, expect, test } from "bun:test"
import { appendFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { ParsedSentence } from "../dependency-graph/dependency-graph.module.code.ts"
import { keyFor, makeParseCacheAt } from "./parse-cache.module.code.ts"

const MODEL = "abc123"
const OFF = "AKASHA_PARSE_CACHE_OFF"

const made: string[] = []

function folder(): string {
  const at = mkdtempSync(join(tmpdir(), "parse-cache-"))
  made.push(at)
  return at
}

function parseOf(text: string): ParsedSentence[] {
  return [
    {
      text,
      start: 0,
      end: text.length,
      tokens: [
        {
          id: 1,
          form: text,
          lemma: text.toLowerCase(),
          upos: "NOUN",
          head: 0,
          deprel: "root",
          start: 0,
          end: text.length,
        },
      ],
    },
  ]
}

afterEach(() => {
  delete process.env[OFF]
  for (const at of made.splice(0)) rmSync(at, { recursive: true, force: true })
})

test("a parse written is read back", () => {
  const cache = makeParseCacheAt(MODEL, folder())
  cache.write("A page is a file.", parseOf("A page is a file."))
  expect(cache.read("A page is a file.")).toEqual(parseOf("A page is a file."))
})

test("a parse written is read back by a cache that never held it in memory", () => {
  const at = folder()
  makeParseCacheAt(MODEL, at).write("A page is a file.", parseOf("A page is a file."))
  expect(makeParseCacheAt(MODEL, at).read("A page is a file.")).toEqual(
    parseOf("A page is a file.")
  )
})

test("a text the cache has not seen answers nothing", () => {
  expect(makeParseCacheAt(MODEL, folder()).read("A page is a file.")).toBeNull()
})

test("a line whose text is not the text asked for answers nothing", () => {
  const at = folder()
  mkdirSync(at, { recursive: true })
  const key = keyFor(MODEL, "A page is a file.")
  appendFileSync(
    join(at, `${key.slice(0, 2)}.jsonl`),
    `${JSON.stringify({ k: key, t: "A wholly other sentence.", p: parseOf("A wholly other sentence.") })}\n`
  )
  expect(makeParseCacheAt(MODEL, at).read("A page is a file.")).toBeNull()
})

test("a torn line is skipped and the rest of the shard still answers", () => {
  const at = folder()
  mkdirSync(at, { recursive: true })
  const key = keyFor(MODEL, "A page is a file.")
  const shard = join(at, `${key.slice(0, 2)}.jsonl`)
  appendFileSync(shard, '{"k":"deadbe, this line was torn in half\n')
  appendFileSync(
    shard,
    `${JSON.stringify({ k: key, t: "A page is a file.", p: parseOf("A page is a file.") })}\n`
  )
  expect(makeParseCacheAt(MODEL, at).read("A page is a file.")).toEqual(
    parseOf("A page is a file.")
  )
})

test("two models keep their parses apart", () => {
  const at = folder()
  makeParseCacheAt(MODEL, at).write("A page is a file.", parseOf("A page is a file."))
  expect(makeParseCacheAt("a-second-model", at).read("A page is a file.")).toBeNull()
})

test("a cache turned off answers nothing and writes nothing", () => {
  const at = folder()
  process.env[OFF] = "1"
  const cache = makeParseCacheAt(MODEL, at)
  cache.write("A page is a file.", parseOf("A page is a file."))
  expect(cache.read("A page is a file.")).toBeNull()
  delete process.env[OFF]
  expect(makeParseCacheAt(MODEL, at).read("A page is a file.")).toBeNull()
})

test("a key is settled by the model as well as by the text", () => {
  expect(keyFor(MODEL, "A page is a file.")).toBe(keyFor(MODEL, "A page is a file."))
  expect(keyFor(MODEL, "A page is a file.")).not.toBe(keyFor("other", "A page is a file."))
  expect(keyFor(MODEL, "A page is a file.")).not.toBe(keyFor(MODEL, "A page is a folder."))
})
