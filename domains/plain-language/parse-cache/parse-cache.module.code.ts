import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { appendFileSync, mkdirSync, readFileSync } from "node:fs"
import { isAbsolute, join, resolve } from "node:path"
import type { ParsedSentence } from "../dependency-graph/dependency-graph.module.code.ts"

const OFF = "AKASHA_PARSE_CACHE_OFF"
const SHARD_WIDTH = 2
const KEY_WIDTH = 32
const NO_MODEL = "unknown-model"
const CACHE_PARTS = ["cache", "parse"]

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

export function sharedGitDirAt(from: string): string | null {
  try {
    const said = execFileSync("git", ["rev-parse", "--git-common-dir"], {
      cwd: from,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
    if (said === "") return null
    return isAbsolute(said) ? said : resolve(from, said)
  } catch {
    return null
  }
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
      } catch {
        // A line two appends tore in half is skipped, so the text is parsed again.
      }
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
      } catch {
        // A cache the disk refuses still answers for the life of the process.
      }
    },
  }
}

export function makeParseCache(model: string | undefined, from: string): ParseCache {
  if (turnedOff()) return NOTHING_CACHED
  const shared = sharedGitDirAt(from)
  if (shared === null) return NOTHING_CACHED
  return makeParseCacheAt(model ?? NO_MODEL, join(shared, ...CACHE_PARTS, model ?? NO_MODEL))
}
