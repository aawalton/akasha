import { createRequire } from "node:module"
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
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

export type Standing = {
  readonly path: string
  readonly id: string
}

const NOT_A_RELATION = new Set(["id", "slug", "pageTypeSlug"])

function firstValueIn(declared: Record<string, unknown>): Value | null {
  for (const one of Object.values(declared)) {
    if (one !== null && typeof one === "object" && !Array.isArray(one)) return one as Value
  }
  return null
}

export function valueIn(body: string): Value | null {
  const held = mkdtempSync(join(tmpdir(), "akasha-index-"))
  try {
    const at = join(held, "held.page.ts")
    writeFileSync(at, body)
    return firstValueIn(loadFrom(at) as Record<string, unknown>)
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

function valueAt(path: string): Value | null {
  if (!existsSync(path)) return null
  return firstValueIn(loadFrom(path) as Record<string, unknown>)
}

function textAt(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" ? held : null
}

function kebab(key: string): string {
  return key.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)
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

function standingIn(at: string): readonly Standing[] {
  return linesIn(at).map((one) => JSON.parse(one) as Standing)
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

export type Known = {
  readonly targetOf: (propertySlug: string) => string | null
  readonly admitting: (target: string) => readonly string[]
  readonly at: (pageTypeSlug: string, slug: string) => readonly Standing[]
  readonly byId: (id: string) => Standing | null
}

function everyPageOf(root: string, pageTypeSlug: string): readonly Standing[] {
  const dir = join(root, "identity", pageTypeSlug, "slug")
  if (!existsSync(dir)) return []
  const found: Standing[] = []
  for (const one of readdirSync(dir)) found.push(...standingIn(join(dir, one)))
  return found
}

export function knownIn(root: string): Known {
  const target = new Map<string, string>()
  const entry = new Map<string, string>()
  for (const one of everyPageOf(root, "page-property-type")) {
    const value = valueAt(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    if (slug === null) continue
    const kind = textAt(value, "kind")
    if (kind === "relation") {
      const named = textAt(value, "targetPageTypeSlug")
      if (named !== null) target.set(slug, named)
    }
    if (kind === "list") {
      const named = textAt(value, "entrySlug")
      if (named !== null) entry.set(slug, named)
    }
  }

  const above = new Map<string, string>()
  for (const one of everyPageOf(root, "page-type")) {
    const value = valueAt(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    const extendsSlug = textAt(value, "extendsSlug")
    if (slug !== null && extendsSlug !== null) above.set(slug, extendsSlug)
  }
  const everyType = new Set<string>([...above.keys(), ...above.values()])

  const targetOf = (propertySlug: string): string | null => {
    const walked = new Set<string>()
    let here: string | undefined = propertySlug
    while (here !== undefined && !walked.has(here)) {
      walked.add(here)
      const named = target.get(here)
      if (named !== undefined) return named
      here = entry.get(here)
    }
    return null
  }

  const admitting = (wanted: string): readonly string[] => {
    const found: string[] = []
    for (const one of everyType) {
      const walked = new Set<string>()
      let here: string | undefined = one
      while (here !== undefined && !walked.has(here)) {
        if (here === wanted) {
          found.push(one)
          break
        }
        walked.add(here)
        here = above.get(here)
      }
    }
    return found
  }

  return {
    targetOf,
    admitting,
    at: (pageTypeSlug, slug) => standingIn(join(root, "identity", pageTypeSlug, "slug", `${slug}.jsonl`)),
    byId: (id) => standingIn(join(root, "identity", "page", "id", `${id}.jsonl`))[0] ?? null,
  }
}

const AN_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

export type Reached = { readonly id: string } | { readonly refused: string }

function only(found: readonly Standing[]): Standing | null {
  const one = found[0]
  return found.length === 1 && one !== undefined ? one : null
}

function among(named: string, found: readonly Standing[]): string {
  return `\`${named}\` narrows to ${found.length} pages and must name its page type — ${found
    .map((one) => one.path)
    .join(", ")}`
}

export function reaches(named: string, wanted: string | null, known: Known): Reached {
  if (AN_ID.test(named)) {
    return known.byId(named) === null ? { refused: `no page carries the id \`${named}\`` } : { id: named }
  }
  const cut = named.indexOf("/")
  if (cut !== -1) {
    const pageTypeSlug = named.slice(0, cut)
    const slug = named.slice(cut + 1)
    const found = known.at(pageTypeSlug, slug)
    const one = only(found)
    if (one !== null) return { id: one.id }
    if (found.length === 0) return { refused: `no \`${pageTypeSlug}\` carries the slug \`${slug}\`` }
    return { refused: among(named, found) }
  }
  if (wanted === null) {
    return { refused: `\`${named}\` names no page type and its property declares no target` }
  }
  const found = known.admitting(wanted).flatMap((pageTypeSlug) => known.at(pageTypeSlug, named))
  const one = only(found)
  if (one !== null) return { id: one.id }
  if (found.length === 0) return { refused: `no page admitting \`${wanted}\` carries the slug \`${named}\`` }
  return { refused: among(named, found) }
}

function namesIn(held: unknown): readonly string[] {
  if (typeof held === "string") return [held]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export type Filed = {
  readonly entries: readonly Entry[]
  readonly refused: readonly string[]
}

const NOTHING_FILED: Filed = { entries: [], refused: [] }

export function relationIn(value: Value, path: string, known: Known): Filed {
  const id = textAt(value, "id")
  if (id === null) return NOTHING_FILED
  const line = JSON.stringify({ path })
  const entries: Entry[] = []
  const refused: string[] = []
  for (const [key, held] of Object.entries(value)) {
    if (NOT_A_RELATION.has(key) || held === null) continue
    const propertySlug = kebab(key)
    const wanted = known.targetOf(propertySlug)
    if (wanted === null) continue
    for (const named of namesIn(held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
        refused.push(`${path}: \`${propertySlug}\` — ${reached.refused}`)
        continue
      }
      entries.push({
        at: join("relation", "page", "id", reached.id, propertySlug, `${id}.jsonl`),
        line,
      })
    }
  }
  return { entries, refused }
}

type Pending = {
  readonly before: string | null
  readonly after: string | null
}

function keyOf(one: Entry): string {
  return `${one.at} ${one.line}`
}

function settleOver(
  root: string,
  was: readonly Entry[],
  now: readonly Entry[]
): void {
  const withdrawn = new Map<string, Set<string>>()
  const added = new Map<string, Set<string>>()
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
  for (const at of new Set([...withdrawn.keys(), ...added.keys()])) {
    const full = join(root, at)
    const gone = withdrawn.get(at) ?? new Set<string>()
    const come = added.get(at) ?? new Set<string>()
    const lines = [...linesIn(full)].filter((one) => !gone.has(one))
    for (const one of come) if (!lines.includes(one)) lines.push(one)
    keepWhole(full, [...lines].sort(), root)
  }
}


function pagesUnder(tree: string): readonly string[] {
  const named = /^(.+)\.([a-z0-9-]+)\.ts$/
  const found: string[] = []
  const walk = (at: string): void => {
    for (const one of readdirSync(at, { withFileTypes: true })) {
      const here = join(at, one.name)
      if (one.isDirectory()) walk(here)
      else if (named.test(one.name)) found.push(here)
    }
  }
  walk(tree)
  const pageTypes = new Set<string>(["page-type"])
  for (const one of found) {
    const said = named.exec(one.slice(one.lastIndexOf("/") + 1))
    if (said !== null && said[2] === "page-type" && said[1] !== undefined) pageTypes.add(said[1])
  }
  return found.filter((one) => {
    const said = named.exec(one.slice(one.lastIndexOf("/") + 1))
    return said !== null && said[2] !== undefined && pageTypes.has(said[2])
  })
}

function filesUnder(at: string): readonly string[] {
  if (!existsSync(at)) return []
  const found: string[] = []
  const walk = (here: string): void => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const next = join(here, one.name)
      if (one.isDirectory()) walk(next)
      else found.push(next)
    }
  }
  walk(at)
  return found
}

function reconcile(under: string, entries: readonly Entry[], root: string): void {
  const wanted = new Map<string, Set<string>>()
  for (const one of entries) {
    const held = wanted.get(one.at) ?? new Set<string>()
    held.add(one.line)
    wanted.set(one.at, held)
  }
  for (const one of filesUnder(under)) {
    if (!wanted.has(one.slice(root.length + 1))) keepWhole(one, [], root)
  }
  for (const [at, lines] of wanted) keepWhole(join(root, at), [...lines].sort(), root)
}

export function rebuiltFrom(
  tree: string,
  root: string
): { readonly pages: number; readonly entries: number; readonly refused: readonly string[] } {
  const held: { readonly path: string; readonly value: Value }[] = []
  for (const path of pagesUnder(tree)) {
    const value = valueAt(path)
    if (value !== null) held.push({ path, value })
  }
  const identity = held.flatMap((one) => identityIn(one.value, one.path))
  reconcile(join(root, "identity"), identity, root)
  const known = knownIn(root)
  const filed = held.map((one) => relationIn(one.value, one.path, known))
  const relation = filed.flatMap((one) => one.entries)
  reconcile(join(root, "relation"), relation, root)
  return {
    pages: held.length,
    entries: identity.length + relation.length,
    refused: filed.flatMap((one) => one.refused),
  }
}

export function indexingAt(root: string): Indexing {
  const pending = new Map<string, Pending>()

  const note = (path: string, before: string | null, after: string | null): void => {
    const held = pending.get(path)
    pending.set(path, { before: held === undefined ? before : held.before, after })
  }

  return {
    wrote: (path, body, before) => note(path, before, body),
    took: (path, before) => note(path, before, null),
    settle: () => {
      const held = [...pending].map(([path, one]) => ({
        path,
        was: one.before === null ? null : valueIn(one.before),
        now: one.after === null ? null : valueIn(one.after),
      }))
      pending.clear()

      settleOver(
        root,
        held.flatMap((one) => (one.was === null ? [] : identityIn(one.was, one.path))),
        held.flatMap((one) => (one.now === null ? [] : identityIn(one.now, one.path)))
      )

      const known = knownIn(root)
      const was = held.map((one) => (one.was === null ? NOTHING_FILED : relationIn(one.was, one.path, known)))
      const now = held.map((one) => (one.now === null ? NOTHING_FILED : relationIn(one.now, one.path, known)))
      settleOver(
        root,
        was.flatMap((one) => one.entries),
        now.flatMap((one) => one.entries)
      )
      return now.flatMap((one) => one.refused)
    },
  }
}
