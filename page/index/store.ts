import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { markOf } from "../../cache/mark.ts"
import { oidsUnder } from "../../cache/oid.ts"
import type { Roots } from "../page-at.ts"
import { PAGE_EXTENSION } from "../page-name.ts"
import { type Source, bodyOf, sourcesOf } from "./entry.ts"
import { builtFromAt, fileFor, indexRoot } from "./place.ts"

const KIND = "pages-index"

const NAME = "relation"

const PAGE_ENDING = `.${PAGE_EXTENSION}`

export type BuiltFrom = Readonly<Record<string, string>>

export function sourcesAt(relation: string, stem: string, type: string): readonly Source[] {
  const at = fileFor(relation, stem, type)
  if (!existsSync(at)) return []
  return sourcesOf(readFileSync(at, "utf8"))
}

export function keepAt(
  relation: string,
  stem: string,
  type: string,
  sources: readonly Source[]
): void {
  const at = fileFor(relation, stem, type)
  if (sources.length === 0) {
    if (existsSync(at)) rmSync(at)
    return
  }
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, bodyOf(sources))
}

export function markFor(root: string): string {
  const inputs: { path: string; oid: string }[] = []
  for (const [key, oid] of oidsUnder(root, null)) {
    if (!key.endsWith(PAGE_ENDING)) continue
    inputs.push({ path: key, oid })
  }
  return markOf(KIND, NAME, process.version, inputs)
}

export function marksOver(roots: Roots): BuiltFrom {
  const made: Record<string, string> = {}
  for (const [repo, root] of Object.entries(roots)) {
    if (root === undefined) continue
    made[repo] = markFor(root)
  }
  return made
}

export function builtFrom(): BuiltFrom | null {
  const at = builtFromAt()
  if (!existsSync(at)) return null
  let held: unknown = null
  try {
    held = JSON.parse(readFileSync(at, "utf8"))
  } catch {
    return null
  }
  if (held === null || typeof held !== "object") return null
  const made: Record<string, string> = {}
  for (const [repo, mark] of Object.entries(held as Record<string, unknown>)) {
    if (typeof mark === "string") made[repo] = mark
  }
  return made
}

export function keepBuiltFrom(marks: BuiltFrom): void {
  const at = builtFromAt()
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, JSON.stringify(marks))
}

export function staleIn(roots: Roots): readonly string[] {
  const held = builtFrom()
  if (held === null) return Object.keys(roots)
  const behind: string[] = []
  for (const [repo, root] of Object.entries(roots)) {
    if (root === undefined) continue
    if (held[repo] !== markFor(root)) behind.push(repo)
  }
  return behind
}

export function emptyIndex(): void {
  const at = indexRoot()
  if (existsSync(at)) rmSync(at, { recursive: true, force: true })
}
