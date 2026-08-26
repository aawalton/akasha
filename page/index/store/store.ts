import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { markOf } from "../../../cache/mark/mark.ts"
import { oidsUnder } from "../../../repo/oid/oid.ts"
import type { Roots } from "../../page.ts"
import { pageNameOf } from "../../name/name.ts"
import {
  type Named,
  type Source,
  bodyOf,
  namedBodyOf,
  namedOf,
  saidNamed,
  sourcesOf,
} from "../entry/entry.ts"
import { type Claims, noClaims } from "../claim/claim.ts"
import type { Stated } from "../identity/identity.ts"
import type { Relation } from "../relation/relation.ts"
import { builtFromAt, claimsAt, fileFor, identityFile, indexRoot } from "../place/place.ts"

const KIND = "pages-index"

const NAME = "relation"

const PAGES = "pages.jsonl"

const RELATIONS = "relations.json"

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

export function namedIn(file: string): readonly Named[] {
  if (!existsSync(file)) return []
  return namedOf(readFileSync(file, "utf8"))
}

export function keepNamedIn(file: string, held: readonly Named[]): void {
  if (held.length === 0) {
    if (existsSync(file)) rmSync(file)
    return
  }
  const sorted = [...held].sort((one, two) => (saidNamed(one) < saidNamed(two) ? -1 : 1))
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, namedBodyOf(sorted))
}

export function pagesNamed(word: string, at: string): readonly Source[] {
  const found: Source[] = []
  for (const one of namedIn(identityFile(word, at))) {
    if (one.at !== at) continue
    found.push({ repo: one.repo, key: one.key })
  }
  return found
}

export function markFor(root: string): string {
  const inputs: { path: string; oid: string }[] = []
  for (const [key, oid] of oidsUnder(root, null)) {
    if (pageNameOf(key) === null) continue
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

function pagesAt(): string {
  return join(indexRoot(), PAGES)
}

function relationsAt(): string {
  return join(indexRoot(), RELATIONS)
}

export function keepPages(stated: Iterable<Stated>): void {
  const lines: string[] = []
  for (const one of stated) lines.push(JSON.stringify(one))
  const at = pagesAt()
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, lines.length === 0 ? "" : `${lines.join("\n")}\n`)
}

export function loadPages(): readonly Stated[] {
  const at = pagesAt()
  if (!existsSync(at)) return []
  const found: Stated[] = []
  for (const line of readFileSync(at, "utf8").split("\n")) {
    if (line === "") continue
    try {
      found.push(JSON.parse(line) as Stated)
    } catch {
      continue
    }
  }
  return found
}

export function keepRelations(relations: ReadonlyMap<string, readonly Relation[]>): void {
  const at = relationsAt()
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, JSON.stringify(Object.fromEntries(relations)))
}

export function loadRelations(): ReadonlyMap<string, readonly Relation[]> {
  const at = relationsAt()
  if (!existsSync(at)) return new Map()
  try {
    const held = JSON.parse(readFileSync(at, "utf8")) as Record<string, readonly Relation[]>
    return new Map(Object.entries(held))
  } catch {
    return new Map()
  }
}

export function keepClaims(claims: Claims): void {
  const words: Record<string, Record<string, readonly string[]>> = {}
  for (const word of Object.keys(claims.words).sort()) {
    const under = claims.words[word] ?? {}
    const settled: Record<string, readonly string[]> = {}
    for (const at of Object.keys(under).sort()) settled[at] = under[at] ?? []
    words[word] = settled
  }
  const at = claimsAt()
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, JSON.stringify({ keys: [...claims.keys].sort(), words }))
}

export function loadClaims(): Claims {
  const at = claimsAt()
  if (!existsSync(at)) return noClaims()
  try {
    const held = JSON.parse(readFileSync(at, "utf8")) as Claims
    if (held.words === undefined || held.keys === undefined) return noClaims()
    return held
  } catch {
    return noClaims()
  }
}

export function emptyIndex(): void {
  const at = indexRoot()
  if (existsSync(at)) rmSync(at, { recursive: true, force: true })
}
