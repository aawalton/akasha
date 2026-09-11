import { createHash } from "node:crypto"
import { appendFileSync, mkdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { ParsedSentence } from "akasha/domains/plain-language/dependency-graph/dependency-graph.module.code.ts"
import { CACHE } from "akasha/files/git-place/git-place.module.code.ts"
import { gitDirIn } from "akasha/git/dir/git-dir.module.code.ts"

const OFF = "AKASHA_PARSE_CACHE_OFF"
const SHARD_WIDTH = 2
const KEY_WIDTH = 32
const NO_MODEL = "unknown-model"
const CACHE_PARTS = [CACHE, "parse"]

export type ParseCache = {
  readonly at: string | null
  read: (text: string) => ParsedSentence[] | null
  write: (text: string, parsed: readonly ParsedSentence[]) => void
}

type Held = {
  k: string
  t: string
  p: ParsedSentence[]
}

const NOTHING_CACHED: ParseCache = {
  at: null,
  read: () => null,
  write: () => undefined,
}

function turnedOff(): boolean {
  const said = process.env[OFF]
  return said !== undefined && said !== ""
}

export function keyFor(model: string, text: string): string {
  return createHash("sha256")
    .update(model)
    .update("\n")
    .update(text)
    .digest("hex")
    .slice(0, KEY_WIDTH)
}

export function makeParseCacheAt(model: string, at: string): ParseCache {
  if (turnedOff()) return NOTHING_CACHED
  const shards = new Map<string, Map<string, Held>>()

  function shardNamed(key: string): string {
    return key.slice(0, SHARD_WIDTH)
  }

  function shardOf(key: string): Map<string, Held> {
    const name = shardNamed(key)
    const already = shards.get(name)
    if (already !== undefined) return already
    const held = new Map<string, Held>()
    let body = ""
    try {
      body = readFileSync(join(at, `${name}.jsonl`), "utf8")
    } catch {
      body = ""
    }
    for (const line of body.split("\n")) {
      if (line === "") continue
      try {
        const one = JSON.parse(line) as Held
        if (typeof one.k === "string" && typeof one.t === "string" && Array.isArray(one.p)) {
          held.set(one.k, one)
        }
      } catch {}
    }
    shards.set(name, held)
    return held
  }

  return {
    at,
    read(text) {
      const key = keyFor(model, text)
      const one = shardOf(key).get(key)
      if (one === undefined) return null
      if (one.t !== text) return null
      return one.p
    },
    write(text, parsed) {
      const key = keyFor(model, text)
      const shard = shardOf(key)
      const already = shard.get(key)
      if (already !== undefined && already.t === text) return
      const one: Held = { k: key, t: text, p: [...parsed] }
      shard.set(key, one)
      try {
        mkdirSync(at, { recursive: true })
        appendFileSync(join(at, `${shardNamed(key)}.jsonl`), `${JSON.stringify(one)}\n`)
      } catch {}
    },
  }
}

export function makeParseCache(model: string | undefined, from: string): ParseCache {
  if (turnedOff()) return NOTHING_CACHED
  const shared = gitDirIn(from)
  if (shared === null) return NOTHING_CACHED
  return makeParseCacheAt(model ?? NO_MODEL, join(shared, ...CACHE_PARTS, model ?? NO_MODEL))
}
