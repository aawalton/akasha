import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { typed } from "akasha/code/typing/code-typing.module.code.ts"
import { rowsOver } from "akasha/pages/entries/page-entries.module.code.ts"
import {
  fileKeysIn,
  filePropertiesIn,
  folderPropertiesIn,
  uncommittedFiledIn,
  uniquePropertiesIn,
} from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { identityIn } from "akasha/pages/indexes/identity/index-identity.index.code.ts"
import { importIn } from "akasha/pages/indexes/import/index-import.index.code.ts"
import {
  type Drift,
  keepDelta,
  type Laid,
  reconcile,
  takenAway,
} from "akasha/pages/indexes/keeping/index-keeping.module.code.ts"
import { listedOf } from "akasha/pages/indexes/listing/index-listing.index.code.ts"
import {
  bodiesAt,
  reachingBuilt,
} from "akasha/pages/indexes/package-reaching/package-reaching.module.code.ts"
import { claimingIn } from "akasha/pages/indexes/path/index-path.index.code.ts"
import { sidecarsIn, under } from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"
import { knownIn } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import { relationIn } from "akasha/pages/indexes/relation/index-relation.index.code.ts"
import { readAt, readerIn, ruleIn } from "akasha/pages/indexes/rule/index-rule.index.code.ts"
import {
  refusingEmpty,
  settlingOver,
} from "akasha/pages/indexes/settling/index-settling.module.code.ts"
import type { Filing } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { indexIn, readingAt } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import {
  pagesUnder,
  walkedUnder,
} from "akasha/pages/indexes/tree-reading/tree-reading.module.code.ts"
import { valueIn } from "akasha/pages/indexes/value/index-value.index.code.ts"
import {
  identifyingFrom,
  sourceOver,
} from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { textOnDisk } from "akasha/utils/fs/text-on-disk/text-on-disk.module.code.ts"

type Pending = {
  readonly before: string | null
  readonly after: string | null
}

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

export function bodiesUnder(tree: string): readonly Bodied[] {
  const found: Bodied[] = []
  for (const path of walkedUnder(tree, typed)) {
    const body = textOnDisk(path)
    if (body !== null) found.push({ path, body })
  }
  return found
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
  const identifying = identifyingFrom(sourceOver(values))
  const identity = held.flatMap((one) => identityIn(one.value, one.path, repo, identifying))
  const drift = [reconcile(identity, root, put, done)]
  const sidecars = sidecarsIn(values)
  const claim = claimingIn(
    repo,
    filedBy,
    sidecars,
    uncommittedFiledIn(values),
    folderPropertiesIn(values)
  )
  const paths = held.flatMap((one) => claim(one.value, one.path, false))
  drift.push(reconcile(paths, root, put, done))
  const listed = listedOf(paths)
  drift.push(reconcile(listed, root, put, done))
  const valued = held.flatMap((one) => valueIn(one.value, one.path, repo))
  drift.push(reconcile(valued, root, put, done))
  const known = knownIn(readingAt(root), (path) => valueAt(path, repo))
  const beside = bodiesAt(repo)
  const filed = held.map((one) =>
    relationIn(
      one.value,
      one.path,
      known,
      repo,
      rowsOver(under(repo, one.path), one.value, known.entriedIn(one.value), beside)
    )
  )
  const relation = filed.flatMap((one) => one.entries)
  drift.push(reconcile(relation, root, put, done))
  const naming = reachingBuilt(held, repo, fileProperties, filedBy)
  const walked = bodiesUnder(tree)
  const imported = walked.flatMap((one) => importIn(one.body, one.path, repo, naming))
  drift.push(reconcile(imported, root, put, done))
  const bodied = new Set(walked.map((one) => under(repo, one.path)))
  const ruled = [
    ...walked.flatMap((one) => ruleIn(one.body, one.path, repo)),
    ...listed.flatMap((one) => (bodied.has(one.line) ? [] : readAt(join(repo, one.line), repo))),
    readerIn(),
  ]
  drift.push(reconcile(ruled, root, put, done))
  const every = [...identity, ...paths, ...listed, ...valued, ...relation, ...imported, ...ruled]
  return {
    pages: held.length,
    entries:
      identity.length +
      paths.length +
      relation.length +
      imported.length +
      ruled.length +
      valued.length,
    refused: filed.flatMap((one) => one.refused),
    drift: drifting(drift, takenAway(every, root, put, done)),
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

export function filedInto(root: string, filings: readonly Filing[]): undefined {
  for (const one of filings) keepDelta(join(root, one.at), one, root)
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
      return [...found.noted, ...found.refusedBefore, ...found.refused]
    },
  }
}
