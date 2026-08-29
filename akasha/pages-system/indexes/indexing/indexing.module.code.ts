import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, isAbsolute, join, relative } from "node:path"
import { namedIn, pageNamed } from "../../page/page-file-name/page-file-name.module.code.ts"
import { indexIdentity } from "../index/index-identity/index-identity.index.ts"
import { indexImport } from "../index/index-import/index-import.index.ts"
import { indexPath } from "../index/index-path/index-path.index.ts"
import { indexRelation } from "../index/index-relation/index-relation.index.ts"
import { indexSchema } from "../index/index-schema/index-schema.index.ts"
import type { Entry, Value } from "../index-entries/index-entries.module.code.ts"
import {
  filePropertiesAt,
  filePropertiesIn,
  identityIn,
  importIn,
  loadedFrom,
  pageTypesIn,
  pathIn,
  schemaAt,
  schemaIn,
  slugAt,
  textAt,
  valueAt,
} from "../index-entries/index-entries.module.code.ts"
import { stampBuilt, stampSettled } from "../index-stamp/index-stamp.module.code.ts"
import {
  type Filing,
  overlaidOn,
  type Reading,
  readingAt,
  readingOf,
} from "../index-surface/index-surface.module.code.ts"
import { knownIn, NOTHING_FILED, relationIn } from "../reaching/reaching.module.code.ts"

const IDENTITY = indexIdentity.indexName

const IMPORT = indexImport.indexName

const PATH = indexPath.indexName

const RELATION = indexRelation.indexName

const SCHEMA = indexSchema.indexName

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

export function filingOf(
  reading: Reading,
  was: readonly Entry[],
  now: readonly Entry[]
): readonly Filing[] {
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
  const said: Filing[] = []
  for (const at of new Set([...withdrawn.keys(), ...added.keys()])) {
    const gone = withdrawn.get(at) ?? new Set<string>()
    const come = added.get(at) ?? new Set<string>()
    const lines = [...reading.lines(at)].filter((one) => !gone.has(one))
    for (const one of come) if (!lines.includes(one)) lines.push(one)
    said.push({ at, lines: [...lines].sort() })
  }
  return said
}

function pageShaped(path: string, fileProperties: ReadonlySet<string>): boolean {
  const said = namedIn(path)
  return said !== null && !fileProperties.has(said.tail)
}

function pagesUnder(tree: string): readonly string[] {
  const found: string[] = []
  const walk = (at: string): void => {
    for (const one of readdirSync(at, { withFileTypes: true })) {
      const here = join(at, one.name)
      if (one.isDirectory()) walk(here)
      else if (namedIn(one.name) !== null) found.push(here)
    }
  }
  walk(tree)
  const pageTypes = new Set<string>(["page-type"])
  for (const one of found) {
    const said = namedIn(one)
    if (said !== null && said.tail === "page-type") pageTypes.add(said.stem)
  }
  return found.filter((one) => {
    const said = namedIn(one)
    return said !== null && pageTypes.has(said.tail)
  })
}

const TS = ".ts"

function bodiesUnder(tree: string): readonly string[] {
  const found: string[] = []
  const walk = (at: string): void => {
    for (const one of readdirSync(at, { withFileTypes: true })) {
      const here = join(at, one.name)
      if (one.isDirectory()) walk(here)
      else if (one.name.endsWith(TS)) found.push(here)
    }
  }
  walk(tree)
  return found
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

export type Indexing = {
  readonly wrote: (path: string, body: string, before: string | null) => void
  readonly took: (path: string, before: string | null) => void
  readonly settle: () => readonly string[]
}

function uniquePropertiesIn(values: Iterable<Value>): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const value of values) {
    const reach = slugAt(value, "unique")
    const slug = textAt(value, "slug")
    if (reach !== null && slug !== null) found.set(slug, reach)
  }
  return found
}

function uniquePropertiesAt(given: string | Reading): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [slug, held] of schemaAt(given)) {
    if (held.unique !== null) found.set(slug, held.unique)
  }
  return found
}

const NOTHING_DECLARES =
  "these pages declare no property carrying a `unique`, so no identity would be filed — the index refuses rather than answering empty"

function refusingEmpty(unique: ReadonlyMap<string, string>, properties: number): void {
  if (properties > 0 && unique.size === 0) throw new Error(NOTHING_DECLARES)
}

export function rebuiltFrom(
  tree: string,
  root: string,
  repo: string
): { readonly pages: number; readonly entries: number; readonly refused: readonly string[] } {
  const held: { readonly path: string; readonly value: Value }[] = []
  for (const path of pagesUnder(tree)) {
    const value = valueAt(path, repo)
    if (value !== null) held.push({ path, value })
  }
  const fileProperties = filePropertiesIn(held.map((one) => one.value))
  const unique = uniquePropertiesIn(held.map((one) => one.value))
  const schema = held.flatMap((one) => schemaIn(one.value))
  refusingEmpty(unique, held.length)
  const identity = held.flatMap((one) => identityIn(one.value, one.path, repo, unique))
  reconcile(join(root, IDENTITY), identity, root)
  const paths = held.flatMap((one) => pathIn(one.value, one.path, repo, fileProperties))
  reconcile(join(root, PATH), paths, root)
  reconcile(join(root, SCHEMA), schema, root)
  const known = knownIn(root, repo)
  const filed = held.map((one) => relationIn(one.value, one.path, known, repo))
  const relation = filed.flatMap((one) => one.entries)
  reconcile(join(root, RELATION), relation, root)
  const imported = bodiesUnder(tree).flatMap((path) =>
    importIn(readFileSync(path, "utf8"), path, repo)
  )
  reconcile(join(root, IMPORT), imported, root)
  stampBuilt(repo, tree, root)
  return {
    pages: held.length,
    entries: identity.length + paths.length + schema.length + relation.length + imported.length,
    refused: filed.flatMap((one) => one.refused),
  }
}

export type Moving = {
  readonly path: string
  readonly before: string | null
  readonly after: string | null
}

export type Settling = {
  readonly filings: readonly Filing[]
  readonly noted: readonly string[]
  readonly refused: readonly string[]
}

export function settlingOver(
  given: string | Reading,
  repo: string,
  moving: readonly Moving[],
  pageOf: (path: string) => Value | null = (path) => valueAt(path, repo)
): Settling {
  const reading = readingOf(given)
  const pageTypes = pageTypesIn(reading)
  const filed = filePropertiesAt(reading)
  const noted: string[] = []
  const readInto = (body: string | null, path: string): Value | null => {
    if (body === null || !pageShaped(path, filed)) return null
    const loaded = loadedFrom(body)
    if (loaded.failed !== null && pageNamed(path, pageTypes)) {
      noted.push(`${path}: its body did not load, so it is not indexed — ${loaded.failed}`)
    }
    return loaded.value
  }

  const held = moving.map((one) => ({
    path: one.path,
    before: one.before,
    after: one.after,
    was: readInto(one.before, one.path),
    now: readInto(one.after, one.path),
  }))

  const imported = filingOf(
    reading,
    held.flatMap((one) => (one.before === null ? [] : importIn(one.before, one.path, repo))),
    held.flatMap((one) => (one.after === null ? [] : importIn(one.after, one.path, repo)))
  )

  const standing = held.flatMap((one) => (one.now === null ? [] : [one.now]))
  const fileProperties = new Set<string>([...filed, ...filePropertiesIn(standing)])
  const unique = new Map<string, string>([
    ...uniquePropertiesAt(reading),
    ...uniquePropertiesIn(standing),
  ])
  const nowSchema = held.flatMap((one) => (one.now === null ? [] : schemaIn(one.now)))
  refusingEmpty(unique, held.filter((one) => one.now !== null).length)
  const identity = filingOf(
    reading,
    held.flatMap((one) => (one.was === null ? [] : identityIn(one.was, one.path, repo, unique))),
    held.flatMap((one) => (one.now === null ? [] : identityIn(one.now, one.path, repo, unique)))
  )
  const paths = filingOf(
    reading,
    held.flatMap((one) =>
      one.was === null ? [] : pathIn(one.was, one.path, repo, fileProperties)
    ),
    held.flatMap((one) => (one.now === null ? [] : pathIn(one.now, one.path, repo, fileProperties)))
  )
  const schema = filingOf(
    reading,
    held.flatMap((one) => (one.was === null ? [] : schemaIn(one.was))),
    nowSchema
  )

  const stepped = overlaidOn(reading, [...imported, ...identity, ...paths, ...schema])
  const known = knownIn(stepped, repo, pageOf)
  const was = held.map((one) =>
    one.was === null ? NOTHING_FILED : relationIn(one.was, one.path, known, repo)
  )
  const now = held.map((one) =>
    one.now === null ? NOTHING_FILED : relationIn(one.now, one.path, known, repo)
  )
  const relation = filingOf(
    reading,
    was.flatMap((one) => one.entries),
    now.flatMap((one) => one.entries)
  )

  return {
    filings: [...imported, ...identity, ...paths, ...schema, ...relation],
    noted,
    refused: now.flatMap((one) => one.refused),
  }
}

export function indexingAt(root: string, repo: string): Indexing {
  const pending = new Map<string, Pending>()

  const note = (path: string, before: string | null, after: string | null): void => {
    const held = pending.get(path)
    pending.set(path, { before: held === undefined ? before : held.before, after })
  }

  return {
    wrote: (path, body, before) => note(path, before, body),
    took: (path, before) => note(path, before, null),
    settle: () => {
      const moving = [...pending].map(([path, one]) => ({
        path,
        before: one.before,
        after: one.after,
      }))
      pending.clear()
      const found = settlingOver(readingAt(root), repo, moving)
      for (const one of found.filings) keepWhole(join(root, one.at), one.lines, root)
      stampSettled(
        repo,
        root,
        moving.map((one) => (isAbsolute(one.path) ? relative(repo, one.path) : one.path))
      )
      return [...found.noted, ...found.refused]
    },
  }
}
