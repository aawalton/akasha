import { mkdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { typed } from "akasha/code/code-typing/code-typing.module.code.ts"
import { rowsOver } from "akasha/pages/entries/page-entries.module.code.ts"
import {
  DECLARING_UNDER,
  declaredIn,
} from "akasha/pages/indexes/declaring/index-declaring.index.code.ts"
import {
  fileKeysIn,
  filePropertiesIn,
  folderPropertiesIn,
  uncommittedFiledIn,
  uniquePropertiesIn,
} from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { identityIn } from "akasha/pages/indexes/identity/index-identity.index.code.ts"
import { indexIdentity } from "akasha/pages/indexes/identity/index-identity.index.ts"
import { importIn } from "akasha/pages/indexes/import/index-import.index.code.ts"
import { indexImport } from "akasha/pages/indexes/import/index-import.index.ts"
import { LISTED_UNDER, listedOf } from "akasha/pages/indexes/listing/index-listing.index.code.ts"
import {
  bodiesAt,
  reachingBuilt,
} from "akasha/pages/indexes/package-reaching/package-reaching.module.code.ts"
import { claimingIn } from "akasha/pages/indexes/path/index-path.index.code.ts"
import { indexPath } from "akasha/pages/indexes/path/index-path.index.ts"
import { sidecarsIn, under } from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"
import { knownIn } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import {
  type Drift,
  keepDelta,
  reconcile,
} from "akasha/pages/indexes/rebuilding/rebuilding.module.code.ts"
import { relationIn } from "akasha/pages/indexes/relation/index-relation.index.code.ts"
import { indexRelation } from "akasha/pages/indexes/relation/index-relation.index.ts"
import { readAt, readerIn, ruleIn } from "akasha/pages/indexes/rule/index-rule.index.code.ts"
import { indexRule } from "akasha/pages/indexes/rule/index-rule.index.ts"
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
import { indexValue } from "akasha/pages/indexes/value/index-value.index.ts"
import {
  identifyingFrom,
  sourceOver,
} from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const IDENTITY = indexIdentity.name

const IMPORT = indexImport.name

const PATH = indexPath.name

const RELATION = indexRelation.name

const RULE = indexRule.name

const VALUE = indexValue.name

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

function drifting(said: readonly Drift[]): Drift {
  return {
    added: said.flatMap((one) => one.added),
    changed: said.flatMap((one) => one.changed),
    went: said.flatMap((one) => one.went),
  }
}

export function refreshedFrom(tree: string, root: string, repo: string, put = true): Refreshed {
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
  const declared = held.flatMap((one) => declaredIn(one.value))
  refusingEmpty(unique, held.length)
  const identifying = identifyingFrom(sourceOver(values))
  const identity = held.flatMap((one) => identityIn(one.value, one.path, repo, identifying))
  const drift = [reconcile(join(root, IDENTITY), identity, root, put)]
  const sidecars = sidecarsIn(values)
  const claim = claimingIn(
    repo,
    filedBy,
    sidecars,
    uncommittedFiledIn(values),
    folderPropertiesIn(values)
  )
  const paths = held.flatMap((one) => claim(one.value, one.path, false))
  drift.push(reconcile(join(root, PATH), paths, root, put))
  const listed = listedOf(paths)
  drift.push(reconcile(join(root, LISTED_UNDER), listed, root, put))
  drift.push(reconcile(join(root, DECLARING_UNDER), declared, root, put))
  const valued = held.flatMap((one) => valueIn(one.value, one.path, repo))
  drift.push(reconcile(join(root, VALUE), valued, root, put))
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
  drift.push(reconcile(join(root, RELATION), relation, root, put))
  const naming = reachingBuilt(held, repo, fileProperties, filedBy)
  const imported = walkedUnder(tree, typed).flatMap((path) =>
    importIn(readFileSync(path, "utf8"), path, repo, naming)
  )
  drift.push(reconcile(join(root, IMPORT), imported, root, put))
  const walked = walkedUnder(tree, typed)
  const bodied = new Set(walked.map((one) => under(repo, one)))
  const ruled = [
    ...walked.flatMap((path) => ruleIn(readFileSync(path, "utf8"), path, repo)),
    ...listed.flatMap((one) => (bodied.has(one.line) ? [] : readAt(join(repo, one.line), repo))),
    readerIn(),
  ]
  drift.push(reconcile(join(root, RULE), ruled, root, put))
  return {
    pages: held.length,
    entries:
      identity.length +
      paths.length +
      declared.length +
      relation.length +
      imported.length +
      ruled.length +
      valued.length,
    refused: filed.flatMap((one) => one.refused),
    drift: drifting(drift),
  }
}

export function refreshedWhole(repo: string, tree: string, put: boolean): Refreshed {
  return refreshedFrom(tree, indexIn(repo), repo, put)
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
      const found = settlingOver(readingAt(root), repo, moving, (path) => valueAt(path, repo))
      filedInto(root, found.filings)
      return [...found.noted, ...found.refusedBefore, ...found.refused]
    },
  }
}
