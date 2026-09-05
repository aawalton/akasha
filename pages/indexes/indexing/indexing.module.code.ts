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
import { typed } from "@akasha/code-system/code-typing"
import { QUARANTINE_ROOT, VENDOR_ROOT } from "@akasha/pages-system/checkout-roots"
import { pageNamed, partedIn } from "@akasha/pages-system/page-file-name"
import {
  identifyingFrom,
  sourceAmong,
  sourceIn,
  sourceOver,
} from "@akasha/pages-system/page-type-properties"
import { loadedFrom, type Value, valueAt } from "@akasha/pages-system/page-value"
import {
  type Entry,
  fileKeysAt,
  fileKeysIn,
  filePropertiesIn,
  filePropertiesOver,
  type Identifier,
  pageTypesIn,
  sidecarsIn,
  sidecarsOver,
  under,
  uniquePropertiesAt,
  uniquePropertiesIn,
} from "../entries/index-entries.module.code.ts"
import { identityIn } from "../identity/index-identity.index.code.ts"
import { indexIdentity } from "../identity/index-identity.index.ts"
import { importIn } from "../import/index-import.index.code.ts"
import { indexImport } from "../import/index-import.index.ts"
import {
  reachingBuilt,
  reachingSettled,
  rereadOver,
} from "../package-reaching/package-reaching.module.code.ts"
import { claimingIn } from "../path/index-path.index.code.ts"
import { indexPath } from "../path/index-path.index.ts"
import { knownIn } from "../reaching/reaching.module.code.ts"
import { everyPath, indexThere } from "../reading/index-reading.module.code.ts"
import { NOTHING_FILED, relationIn } from "../relation/index-relation.index.code.ts"
import { indexRelation } from "../relation/index-relation.index.ts"
import { schemaIn } from "../schema/index-schema.index.code.ts"
import { indexSchema } from "../schema/index-schema.index.ts"
import type { Filing, Reading } from "../shape/index-shape.module.code.ts"
import { stampBuilt, stampSettled } from "../stamp/index-stamp.module.code.ts"
import {
  indexIn,
  overlaidOn,
  readingAt,
  readingNone,
} from "../surface/index-surface.module.code.ts"
import { valueIn } from "../value/index-value.index.code.ts"
import { indexValue } from "../value/index-value.index.ts"

const IDENTITY = indexIdentity.name

const IMPORT = indexImport.name

const PATH = indexPath.name

const RELATION = indexRelation.name

const SCHEMA = indexSchema.name

const VALUE = indexValue.name

const PAGE_TYPE = "page-type"

function pruneAbove(at: string, root: string): undefined {
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

function keepWhole(at: string, lines: readonly string[], root: string): undefined {
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
  const kept = new Set(now.map(keyOf))
  const withdrawn = Map.groupBy(
    was.filter((one) => !kept.has(keyOf(one))),
    (one) => one.at
  )
  const added = Map.groupBy(now, (one) => one.at)
  const said: Filing[] = []
  for (const at of new Set([...withdrawn.keys(), ...added.keys()])) {
    const gone = new Set((withdrawn.get(at) ?? []).map((one) => one.line))
    const come = new Set((added.get(at) ?? []).map((one) => one.line))
    const surviving = [...reading.lines(at)].filter((one) => !gone.has(one))
    const coming = [...come].filter((one) => !surviving.includes(one))
    said.push({ at, lines: [...surviving, ...coming].sort() })
  }
  return said
}

function pageShaped(path: string, fileProperties: ReadonlyMap<string, string | null>): boolean {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return false
  return !fileProperties.has(said.pageType)
}

// The akasha folder is the repository root, so a walk from the tree meets the vendored
// packages, the quarantine, git's own store and the agents' own working state beside the pages
// rather than above them. None of the four holds a page of this repository's own, and walking
// them is both wrong — `.supervisors/` keeps copies of module pages that collide with the
// originals — and slow. The four are named rather than matched on a leading dot: `.server/`
// under `alan/web` holds 35 module pages that a dot rule would drop, and dropping them is not
// quiet, it refuses every part that names one.
const UNWALKED = new Set<string>([VENDOR_ROOT, QUARANTINE_ROOT, ".git", ".supervisors"])

function walkedUnder(at: string, taking: (name: string) => boolean): readonly string[] {
  const found: string[] = []
  const walk = (here: string): undefined => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      if (one.isDirectory() && UNWALKED.has(one.name)) continue
      const next = join(here, one.name)
      if (one.isDirectory()) walk(next)
      else if (taking(one.name)) found.push(next)
    }
  }
  walk(at)
  return found
}

function pagesUnder(tree: string): readonly string[] {
  const found = walkedUnder(tree, (name) => partedIn(name)?.sections.length === 0)
  const pageTypes = new Set<string>([PAGE_TYPE])
  for (const one of found) {
    const said = partedIn(one)
    if (said?.pageType === PAGE_TYPE) pageTypes.add(said.slug)
  }
  return found.filter((one) => pageTypes.has(partedIn(one)?.pageType ?? ""))
}

function reconcile(under: string, entries: readonly Entry[], root: string): undefined {
  const wanted = Map.groupBy(entries, (one) => one.at)
  for (const one of existsSync(under) ? walkedUnder(under, () => true) : []) {
    if (!wanted.has(one.slice(root.length + 1))) keepWhole(one, [], root)
  }
  for (const [at, held] of wanted) {
    const lines = new Set(held.map((one) => one.line))
    keepWhole(join(root, at), [...lines].sort(), root)
  }
}

export type Indexing = {
  readonly wrote: (path: string, body: string, before: string | null) => undefined
  readonly took: (path: string, before: string | null) => undefined
  readonly settle: () => readonly string[]
}

const NOTHING_DECLARES =
  "these pages declare no property carrying a `unique`, so no identity would be filed — the index refuses rather than answering empty"

function refusingEmpty(unique: ReadonlyMap<string, Identifier>, pages: number): undefined {
  if (pages > 0 && unique.size === 0) throw new Error(NOTHING_DECLARES)
}

export function rebuiltFrom(
  tree: string,
  root: string,
  repo: string
): { readonly pages: number; readonly entries: number; readonly refused: readonly string[] } {
  mkdirSync(root, { recursive: true })
  const held: { readonly path: string; readonly value: Value }[] = []
  for (const path of pagesUnder(tree)) {
    const value = valueAt(path, repo)
    if (value !== null) held.push({ path, value })
  }
  const values = held.map((one) => one.value)
  const fileProperties = fileKeysIn(values)
  const filedBy = filePropertiesIn(values)
  const unique = uniquePropertiesIn(values)
  const schema = held.flatMap((one) => schemaIn(one.value))
  refusingEmpty(unique, held.length)
  const identifying = identifyingFrom(sourceOver(values))
  const identity = held.flatMap((one) => identityIn(one.value, one.path, repo, identifying))
  reconcile(join(root, IDENTITY), identity, root)
  const sidecars = sidecarsIn(values)
  const claim = claimingIn(repo, filedBy, sidecars)
  const paths = held.flatMap((one) => claim(one.value, one.path, false))
  reconcile(join(root, PATH), paths, root)
  reconcile(join(root, SCHEMA), schema, root)
  const known = knownIn(readingAt(root), (path) => valueAt(path, repo))
  const filed = held.map((one) => relationIn(one.value, one.path, known, repo))
  const relation = filed.flatMap((one) => one.entries)
  reconcile(join(root, RELATION), relation, root)
  const naming = reachingBuilt(held, repo, fileProperties, filedBy)
  const imported = walkedUnder(tree, typed).flatMap((path) =>
    importIn(readFileSync(path, "utf8"), path, repo, naming)
  )
  reconcile(join(root, IMPORT), imported, root)
  const valued = held.flatMap((one) => valueIn(one.value, one.path, repo))
  reconcile(join(root, VALUE), valued, root)
  stampBuilt(repo, tree, root)
  return {
    pages: held.length,
    entries:
      identity.length +
      paths.length +
      schema.length +
      relation.length +
      imported.length +
      valued.length,
    refused: filed.flatMap((one) => one.refused),
  }
}

export type Moving = {
  readonly path: string
  readonly before: string | null
  readonly after: string | null
}

export type Settling = {
  readonly reading: Reading
  readonly filings: readonly Filing[]
  readonly noted: readonly string[]
  readonly refused: readonly string[]
}

function turningIn(
  was: ReadonlyMap<string, Identifier>,
  now: ReadonlyMap<string, Identifier>
): ReadonlySet<string> {
  const said = new Set<string>()
  for (const slug of new Set([...was.keys(), ...now.keys()])) {
    const before = was.get(slug)
    const after = now.get(slug)
    if (before?.key !== after?.key || before?.reach !== after?.reach) said.add(slug)
  }
  return said
}

function asBuilt(given: Reading): Reading {
  return indexThere(given) ? given : readingNone()
}

function elsewhereIn(
  reading: Reading,
  carried: ReadonlySet<string>,
  pageOf: (path: string) => Value | null
): readonly { readonly path: string; readonly value: Value }[] {
  const said: { readonly path: string; readonly value: Value }[] = []
  for (const path of everyPath(reading)) {
    if (carried.has(path)) continue
    const value = pageOf(path)
    if (value !== null) said.push({ path, value })
  }
  return said
}

export function settlingOver(
  given: Reading,
  repo: string,
  moving: readonly Moving[],
  pageOf: (path: string) => Value | null
): Settling {
  const reading = asBuilt(given)
  const pageTypes = pageTypesIn(reading)
  const filed = fileKeysAt(reading)
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

  const left = held.flatMap((one) => (one.now === null ? [] : [one.now]))
  const fileProperties = new Map<string, string | null>([...filed, ...fileKeysIn(left)])
  const filedBy = filePropertiesOver(reading, left)
  const sidecars = sidecarsOver(reading, left)
  const naming = reachingSettled(reading, held, moving, repo, fileProperties, filedBy)
  const { was: wasNaming, reread } = rereadOver(
    reading,
    held,
    repo,
    fileProperties,
    filedBy,
    naming
  )
  const importing = [...held, ...reread]

  const imported = filingOf(
    reading,
    importing.flatMap((one) =>
      one.before === null ? [] : importIn(one.before, one.path, repo, wasNaming)
    ),
    importing.flatMap((one) =>
      one.after === null ? [] : importIn(one.after, one.path, repo, naming)
    )
  )

  const nowSchema = held.flatMap((one) => (one.now === null ? [] : schemaIn(one.now)))
  const schema = filingOf(
    reading,
    held.flatMap((one) => (one.was === null ? [] : schemaIn(one.was))),
    nowSchema
  )
  const overSchema = overlaidOn(reading, schema)
  const wasUnique = uniquePropertiesAt(reading)
  const unique = uniquePropertiesAt(overSchema)
  refusingEmpty(unique, held.filter((one) => one.now !== null).length)
  const turned = turningIn(wasUnique, unique)
  const carried = new Map(held.map((one) => [under(repo, one.path), one]))
  const wasPageOf = (path: string): Value | null => {
    const one = carried.get(under(repo, path))
    return one === undefined ? pageOf(path) : one.was
  }
  const before = held.flatMap((one) => (one.was === null ? [] : [one.was]))
  const wasIdentifying = identifyingFrom(sourceAmong(before, sourceIn(reading, wasPageOf)))
  const nowIdentifying = identifyingFrom(sourceAmong(left, sourceIn(overSchema, pageOf)))
  const elsewhere = turned.size === 0 ? [] : elsewhereIn(reading, new Set(carried.keys()), pageOf)
  const identity = filingOf(
    reading,
    [
      ...held.flatMap((one) =>
        one.was === null ? [] : identityIn(one.was, one.path, repo, wasIdentifying)
      ),
      ...elsewhere.flatMap((one) => identityIn(one.value, one.path, repo, wasIdentifying, turned)),
    ],
    [
      ...held.flatMap((one) =>
        one.now === null ? [] : identityIn(one.now, one.path, repo, nowIdentifying)
      ),
      ...elsewhere.flatMap((one) => identityIn(one.value, one.path, repo, nowIdentifying, turned)),
    ]
  )
  const claim = claimingIn(repo, filedBy, sidecars, carried)
  const paths = filingOf(
    reading,
    held.flatMap((one) => (one.was === null ? [] : claim(one.was, one.path, true))),
    held.flatMap((one) => (one.now === null ? [] : claim(one.now, one.path, false)))
  )

  const stepped = overlaidOn(reading, [...imported, ...identity, ...paths, ...schema])
  const wasKnown = knownIn(reading, wasPageOf)
  const known = knownIn(stepped, pageOf)
  const was = held.map((one) =>
    one.was === null ? NOTHING_FILED : relationIn(one.was, one.path, wasKnown, repo)
  )
  const now = held.map((one) =>
    one.now === null ? NOTHING_FILED : relationIn(one.now, one.path, known, repo)
  )
  const relation = filingOf(
    reading,
    was.flatMap((one) => one.entries),
    now.flatMap((one) => one.entries)
  )

  const valued = filingOf(
    reading,
    held.flatMap((one) => (one.was === null ? [] : valueIn(one.was, one.path, repo))),
    held.flatMap((one) => (one.now === null ? [] : valueIn(one.now, one.path, repo)))
  )

  const filings = [...imported, ...identity, ...paths, ...schema, ...relation, ...valued]
  return {
    reading: overlaidOn(given, filings),
    filings,
    noted,
    refused: [...was, ...now].flatMap((one) => one.refused),
  }
}

export function filedInto(root: string, filings: readonly Filing[]): undefined {
  for (const one of filings) keepWhole(join(root, one.at), one.lines, root)
}

export function keepingIn(repo: string): Indexing {
  return indexingAt(indexIn(repo), repo)
}

export function indexingAt(root: string, repo: string): Indexing {
  const pending = new Map<string, Pending>()

  const note = (path: string, before: string | null, after: string | null): undefined => {
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
      const found = settlingOver(readingAt(root), repo, moving, (path) => valueAt(path, repo))
      filedInto(root, found.filings)
      stampSettled(
        repo,
        root,
        moving.map((one) => (isAbsolute(one.path) ? relative(repo, one.path) : one.path))
      )
      return [...found.noted, ...found.refused]
    },
  }
}
