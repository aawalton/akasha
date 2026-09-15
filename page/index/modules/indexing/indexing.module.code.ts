import { existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { typed } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { textOnDisk } from "akasha/file/disk/modules/text-on-disk/text-on-disk.module.code.ts"
import { textThere } from "akasha/file/disk/modules/text-there/text-there.module.code.ts"
import {
  type Entry,
  fileKeysIn,
  filePropertiesIn,
  type Identifier,
  uniquePropertiesIn,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  IDENTITIES,
  identitiesIn,
} from "akasha/page/index/modules/identities/index-identities.module.code.ts"
import {
  type Drift,
  filedUnder,
  keepDelta,
  keepWhole,
  type Laid,
  reconcile,
  takenAway,
  wholeOf,
} from "akasha/page/index/modules/keeping/index-keeping.module.code.ts"
import {
  bodiesAt,
  reachingBuilt,
} from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import { under } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { shapesAmong } from "akasha/page/index/modules/property-shaping/property-shaping.module.code.ts"
import { knownIn } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import {
  carryingOver,
  settlingOver,
} from "akasha/page/index/modules/settling/index-settling.module.code.ts"
import type { Filing } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { indexIn, readingAt } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  pagesUnder,
  walkedUnder,
} from "akasha/page/index/modules/tree-reading/tree-reading.module.code.ts"
import { carriedFiled } from "akasha/page/modules/carried/page-carried.module.code.ts"
import { rowsOver } from "akasha/page/modules/entries/page-entries.module.code.ts"
import {
  importedFrom,
  namedFrom,
} from "akasha/page/modules/reference-filing/page-reference-filing.module.code.ts"
import { referencesFiled } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  identifyingFrom,
  sourceOver,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

type Pending = {
  readonly before: string | null
  readonly after: string | null
}

const linesKept = (one: string): boolean => one !== ""

export type Indexing = {
  readonly wrote: (path: string, body: string, before: string | null) => undefined
  readonly took: (path: string, before: string | null) => undefined
  readonly settle: () => readonly string[]
}

export type Refreshed = {
  readonly pages: number
  readonly entries: number
  readonly refused: readonly string[]
  readonly drift: Drift
  readonly beside: readonly string[]
}

function drifting(said: readonly Laid[], went: readonly string[]): Drift {
  return {
    added: said.flatMap((one) => one.added),
    changed: said.flatMap((one) => one.changed),
    went,
  }
}

export type Bodied = {
  readonly path: string
  readonly body: string
}

function bodiesUnder(tree: string): readonly Bodied[] {
  const found: Bodied[] = []
  for (const path of walkedUnder(tree, typed)) {
    const body = textOnDisk(path)
    if (body !== null) found.push({ path, body })
  }
  return found
}

function besideStale(
  beside: readonly Entry[],
  tree: string,
  repo: string,
  put: boolean
): readonly string[] {
  const wanted = new Set(beside.map((one) => one.at))
  const went: string[] = []
  for (const at of walkedUnder(tree, (name) => referencesFiled(name) || carriedFiled(name))) {
    const path = under(repo, at)
    if (wanted.has(path)) continue
    went.push(path)
    if (put) keepWhole(at, [], repo)
  }
  return went.sort()
}

const NOTHING_DECLARES =
  "these pages declare no property carrying a `unique`, so no identity would be filed — the index refuses rather than answering empty"

function refusingEmpty(unique: ReadonlyMap<string, Identifier>, pages: number): undefined {
  if (pages > 0 && unique.size === 0) throw new Error(NOTHING_DECLARES)
}

export function refreshedFrom(
  tree: string,
  root: string,
  repo: string,
  put = true,
  done: string[] = []
): Refreshed {
  if (put) mkdirSync(root, { recursive: true })
  const held: { readonly path: string; readonly value: Value }[] = []
  for (const path of pagesUnder(tree)) {
    const value = valueAt(path, repo)
    if (value !== null) held.push({ path, value })
  }
  const values = held.map((one) => one.value)
  const fileProperties = fileKeysIn(values)
  const filedBy = filePropertiesIn(values)
  const unique = uniquePropertiesIn(values)
  refusingEmpty(unique, held.length)
  const source = sourceOver(values)
  const identifying = identifyingFrom(source)
  const identity = held.flatMap((one) => identitiesIn(one.value, one.path, repo, identifying))
  const drift = IDENTITIES.map((name) =>
    reconcile(
      identity.filter((one) => filedUnder(one.at) === name),
      root,
      put,
      done
    )
  )
  const shaped = put
    ? wholeInto(repo, shapesAmong(held.map((one) => ({ ...one, path: under(repo, one.path) }))))
    : []
  const reading = readingAt(root, repo)
  const known = knownIn(reading, (path) => valueAt(path, repo))
  const beside = bodiesAt(repo)
  const naming = reachingBuilt(held, repo, fileProperties, filedBy)
  const walked = bodiesUnder(tree)
  const noted: string[] = []
  const referenced = held.map((one) =>
    namedFrom(
      one.value,
      one.path,
      known,
      repo,
      rowsOver(under(repo, one.path), one.value, known.entriedIn(one.value), beside, (said) => {
        noted.push(said)
      })
    )
  )
  const references = [
    ...referenced.flatMap((one) => one.entries),
    ...walked.flatMap((one) => importedFrom(reading, one.body, one.path, repo, naming)),
  ]
  const carried = carryingOver(
    held.map((one) => ({ path: one.path, was: null, now: one.value })),
    repo
  )
  const filedBeside = [
    ...references,
    ...[...carried].flatMap(([at, lines]) => lines.map((line) => ({ at, line }))),
  ]
  drift.push(reconcile(filedBeside, repo, put, done))
  const stale = besideStale(filedBeside, tree, repo, put)
  const went = [...takenAway(identity, root, put, done), ...stale]
  return {
    pages: held.length,
    entries: identity.length + filedBeside.length,
    refused: [...noted, ...referenced.flatMap((one) => one.refused)],
    drift: drifting(drift, went),
    beside: shaped,
  }
}

export function refreshedWhole(
  repo: string,
  tree: string,
  put: boolean,
  done: string[] = []
): Refreshed {
  return refreshedFrom(tree, indexIn(repo), repo, put, done)
}

function filedInto(root: string, filings: readonly Filing[]): undefined {
  for (const one of filings) keepDelta(join(root, one.at), one, root)
}

function besideInto(repo: string, filings: readonly Filing[]): undefined {
  for (const one of filings) keepDelta(join(repo, one.at), one, repo)
}

function wholeInto(
  repo: string,
  beside: ReadonlyMap<string, string | null>,
  make = true
): readonly string[] {
  const wrote: string[] = []
  for (const [at, whole] of beside) {
    const to = join(repo, at)
    if (!make && !existsSync(to)) continue
    const lines = (whole ?? "").split("\n").filter(linesKept)
    if (textThere(to) === (lines.length === 0 ? null : wholeOf(lines))) continue
    keepWhole(to, lines, repo)
    wrote.push(at)
  }
  return wrote.sort()
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
      const found = settlingOver(readingAt(root, repo), repo, moving, (path) => valueAt(path, repo))
      filedInto(root, found.filings)
      besideInto(repo, found.references)
      wholeInto(repo, found.carried)
      wholeInto(repo, found.beside, false)
      return [...found.noted, ...found.refusedBefore, ...found.refused]
    },
  }
}
