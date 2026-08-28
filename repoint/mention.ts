import { readFileSync } from "node:fs"
import { judge, type Outcome } from "../outcome/outcome.ts"
import type { Roots } from "../page/page.ts"
import { trackedIn } from "../page/tracked/tracked.ts"
import { canonicalize, normalizeAbsolute } from "../repo/path/path.ts"
import { targetRoot } from "../repo/roots/roots.ts"
import { decodeUtf8 } from "../utf8-body/utf8-body.ts"

export const PATH_CHAR = /[A-Za-z0-9_./~$-]/
export const PATH_TAIL = /[A-Za-z0-9_/-]/
const BOUNDARY = "[A-Za-z0-9_/-]"
const NUL = String.fromCharCode(0)

export interface Mention {
  readonly path: string
  readonly start: number
  readonly end: number
  readonly line: number
}

export interface Patch {
  readonly start: number
  readonly end: number
  readonly text: string
  readonly was: string
}

const keyLists = new WeakMap<object, readonly string[]>()
const prefixes = new WeakMap<object, string>()

export function sharedPrefix(paths: Iterable<string>): string {
  let shared: string | null = null
  for (const one of paths) {
    if (shared === null) {
      shared = one
      continue
    }
    let at = 0
    while (at < shared.length && at < one.length && shared[at] === one[at]) at += 1
    if (at === 0) return ""
    shared = shared.slice(0, at)
  }
  return shared ?? ""
}

function keysOf(moves: ReadonlyMap<string, string>): readonly string[] {
  const held = keyLists.get(moves)
  if (held !== undefined) return held
  const made = [...moves.keys()]
  keyLists.set(moves, made)
  return made
}

function prefixOf(paths: Iterable<string>): string {
  const key = paths as unknown as object
  if (typeof key !== "object") return sharedPrefix(paths)
  const held = prefixes.get(key)
  if (held !== undefined) return held
  const made = sharedPrefix(paths)
  prefixes.set(key, made)
  return made
}

function homeOrRefuse(): string {
  const home = process.env.HOME
  if (home === undefined || home === "") {
    throw new Error("$HOME is unset, so nothing says what a `~` or `$HOME` path prefix stands for")
  }
  return home
}

export function mentionsOf(body: string, paths: Iterable<string>, roots: Roots): readonly Mention[] {
  const root = canonicalize(targetRoot(roots))
  const found: Mention[] = []
  const shared = prefixOf(paths)
  if (shared !== "" && !body.includes(shared)) return found
  for (const path of paths) {
    for (let at = body.indexOf(path); at !== -1; at = body.indexOf(path, at + path.length)) {
      const after = body[at + path.length]
      if (after !== undefined && PATH_TAIL.test(after)) continue
      let start = at
      while (start > 0 && PATH_CHAR.test(body[start - 1] ?? "")) start -= 1
      const prefix = body.slice(start, at)
      const rooted =
        prefix === "" ||
        (prefix === "/" && body[start - 1] === "}") ||
        (prefix.endsWith("/") &&
          canonicalize(normalizeAbsolute(prefix.replace(/^(~|\$HOME)/, homeOrRefuse))) === root)
      if (rooted) {
        found.push({ path, start: at, end: at + path.length, line: body.slice(0, at).split("\n").length })
      }
    }
  }
  return found
}

export function mentionPatches(
  body: string,
  moves: ReadonlyMap<string, string>,
  roots: Roots
): readonly Patch[] {
  return mentionsOf(body, keysOf(moves), roots).flatMap((one) => {
    const to = moves.get(one.path)
    return to === undefined ? [] : [{ start: one.start, end: one.end, text: to, was: one.path }]
  })
}

const escapedPatterns = new Map<string, RegExp>()

function escapedPattern(from: string): RegExp {
  const held = escapedPatterns.get(from)
  if (held !== undefined) return held
  const chars = [...from].map((c) => `\\\\?${c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).join("")
  const made = new RegExp(`(?<!${BOUNDARY})${chars}(?!${BOUNDARY})`, "g")
  escapedPatterns.set(from, made)
  return made
}

export function escapedMentions(body: string, moves: ReadonlyMap<string, string>): readonly string[] {
  const found: string[] = []
  if (!body.includes("\\")) return found
  const bare = body.replaceAll("\\", "")
  const keys = keysOf(moves)
  const shared = prefixOf(keys)
  if (shared !== "" && !bare.includes(shared)) return found
  for (const from of keys) {
    if (!bare.includes(from)) continue
    for (const match of body.matchAll(escapedPattern(from))) {
      if (!match[0].includes("\\")) continue
      found.push(`${body.slice(0, match.index).split("\n").length}: \`${match[0]}\``)
    }
  }
  return found
}

export function escapedSpellings(found: readonly string[]): Outcome {
  const detail = `${found.length} occurrence(s) spell a moved path rather than writing it`
  if (found.length === 0) return judge("escaped", detail, [])
  return judge("escaped", detail, [
    ...found,
    "nothing repoints these, because re-emitting a path into a matcher's escaping means guessing which language and which of its characters take a backslash — and a wrong guess reads correct and matches nothing. Write the path whole instead, which for an assertion usually means comparing text rather than matching a pattern, and land that BEFORE the move, which the repo stays green through",
  ])
}

export function* textFiles(root: string): Generator<{ relPath: string; body: string }> {
  for (const relPath of trackedIn(root)) {
    let bytes: Uint8Array
    try {
      bytes = readFileSync(`${root}/${relPath}`)
    } catch {
      continue
    }
    const body = decodeUtf8(bytes)
    if (body !== null && !body.includes(NUL)) yield { relPath, body }
  }
}
