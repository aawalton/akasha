import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { said } from "@akasha/utils-run/running"

const SUFFIX = ".json"

export type Key = {
  readonly kind: string
  readonly name: string
  readonly mark: string
  readonly subject: string
}

function pathOf(key: Key): string {
  return `${key.kind}/${key.name}/${key.mark}/${key.subject}${SUFFIX}`
}

function heldAt(file: string): unknown {
  let raw: string
  try {
    raw = readFileSync(file, "utf8")
  } catch {
    return null
  }
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function gitDirAt(root: string): string {
  return said(["git", "-C", root, "rev-parse", "--absolute-git-dir"]).trim()
}

export function answerAt(at: string, key: Key): unknown {
  return heldAt(join(at, pathOf(key)))
}

export function cacheAnswer(at: string, key: Key, answer: unknown): undefined {
  const file = join(at, pathOf(key))
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(answer))
}

export function forget(at: string, kind: string, live: readonly string[]): undefined {
  if (live.length === 0) return
  const under = join(at, kind)
  if (!existsSync(under)) return
  const keeping = new Set(live)
  for (const name of readdirSync(under)) {
    if (keeping.has(name)) continue
    rmSync(join(under, name), { recursive: true, force: true })
  }
}

export function sweep(at: string, kind: string, name: string, keeping: string): undefined {
  const under = join(at, kind, name)
  if (!existsSync(under)) return
  for (const mark of readdirSync(under)) {
    if (mark === keeping) continue
    rmSync(join(under, mark), { recursive: true, force: true })
  }
}
