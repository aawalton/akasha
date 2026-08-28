import { createRequire } from "node:module"
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  rmdirSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { tmpdir } from "node:os"
import type { Indexing } from "../../write-system/landing.module.code.ts"

const loadFrom = createRequire(import.meta.url)

export type Value = Record<string, unknown>

export type Entry = {
  readonly at: string
  readonly line: string
}

export function valueIn(body: string): Value | null {
  const held = mkdtempSync(join(tmpdir(), "akasha-index-"))
  try {
    const at = join(held, "held.page.ts")
    writeFileSync(at, body)
    const declared = loadFrom(at) as Record<string, unknown>
    for (const one of Object.values(declared)) {
      if (one !== null && typeof one === "object" && !Array.isArray(one)) return one as Value
    }
    return null
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

function textAt(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" ? held : null
}

export function identityIn(value: Value, path: string): readonly Entry[] {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return []
  const line = JSON.stringify({ path, id })
  return [
    { at: join("identity", "page", "id", `${id}.jsonl`), line },
    { at: join("identity", pageTypeSlug, "slug", `${slug}.jsonl`), line },
  ]
}

function linesIn(at: string): readonly string[] {
  if (!existsSync(at)) return []
  return readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "")
}

function pruneAbove(at: string, root: string): void {
  let here = at
  while (here !== root && here.startsWith(root)) {
    try {
      rmdirSync(here)
    } catch {
      return
    }
    here = dirname(here)
  }
}

function keepWhole(at: string, lines: readonly string[], root: string): void {
  if (lines.length === 0) {
    if (existsSync(at)) rmSync(at)
    pruneAbove(dirname(at), root)
    return
  }
  mkdirSync(dirname(at), { recursive: true })
  const near = `${at}.${process.pid}.part`
  writeFileSync(near, `${lines.join("\n")}\n`)
  renameSync(near, at)
}

type Pending = {
  readonly before: string | null
  readonly after: string | null
}

function keyOf(one: Entry): string {
  return `${one.at} ${one.line}`
}

export function indexingAt(root: string): Indexing {
  const pending = new Map<string, Pending>()

  const note = (path: string, before: string | null, after: string | null): void => {
    const held = pending.get(path)
    pending.set(path, { before: held === undefined ? before : held.before, after })
  }

  const entriesFor = (body: string | null, path: string): readonly Entry[] => {
    if (body === null) return []
    const value = valueIn(body)
    return value === null ? [] : identityIn(value, path)
  }

  return {
    wrote: (path, body, before) => note(path, before, body),
    took: (path, before) => note(path, before, null),
    settle: () => {
      const withdrawn = new Map<string, Set<string>>()
      const added = new Map<string, Set<string>>()
      for (const [path, one] of pending) {
        const was = entriesFor(one.before, path)
        const now = entriesFor(one.after, path)
        const kept = new Set(now.map(keyOf))
        for (const gone of was) {
          if (kept.has(keyOf(gone))) continue
          const held = withdrawn.get(gone.at) ?? new Set<string>()
          held.add(gone.line)
          withdrawn.set(gone.at, held)
        }
        for (const come of now) {
          const held = added.get(come.at) ?? new Set<string>()
          held.add(come.line)
          added.set(come.at, held)
        }
      }
      for (const at of new Set([...withdrawn.keys(), ...added.keys()])) {
        const full = join(root, at)
        const gone = withdrawn.get(at) ?? new Set<string>()
        const come = added.get(at) ?? new Set<string>()
        const lines = [...linesIn(full)].filter((one) => !gone.has(one))
        for (const one of come) if (!lines.includes(one)) lines.push(one)
        keepWhole(full, [...lines].sort(), root)
      }
      pending.clear()
    },
  }
}
