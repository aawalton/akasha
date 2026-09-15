import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { typed } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { identityIn } from "akasha/pages/index/identity/index-identity.index.code.ts"
import { importIn } from "akasha/pages/index/import/index-import.index.code.ts"
import {
  fileKeysIn,
  filePropertiesIn,
  uniquePropertiesIn,
} from "akasha/pages/index/modules/entries/index-entries.module.code.ts"
import {
  type Drift,
  dropBuilt,
  keepBuilt,
  keepDelta,
  type Laid,
  reconcile,
  takenAway,
} from "akasha/pages/index/modules/keeping/index-keeping.module.code.ts"
import {
  bodiesAt,
  reachingBuilt,
} from "akasha/pages/index/modules/package-reaching/package-reaching.module.code.ts"
import { under } from "akasha/pages/index/modules/path-claiming/path-claiming.module.code.ts"
import { knownIn } from "akasha/pages/index/modules/reaching/reaching.module.code.ts"
import {
  refusingEmpty,
  settlingOver,
} from "akasha/pages/index/modules/settling/index-settling.module.code.ts"
import type { Filing } from "akasha/pages/index/modules/shape/index-shape.module.code.ts"
import {
  indexIn,
  readingBuilding,
} from "akasha/pages/index/modules/surface/index-surface.module.code.ts"
import {
  pagesUnder,
  walkedUnder,
} from "akasha/pages/index/modules/tree-reading/tree-reading.module.code.ts"
import { edgeIn } from "akasha/pages/index/edge/index-edge.index.code.ts"
import { readerIn, ruleIn } from "akasha/pages/index/rule/index-rule.index.code.ts"
import {
  pageTypeSlugsIn,
  shapeFiled,
  shapesFiled,
  shapesIn,
} from "akasha/pages/index/shapes/index-shapes.index.code.ts"
import { valueIn } from "akasha/pages/index/value/index-value.index.code.ts"
import { rowsOver } from "akasha/pages/modules/entries/page-entries.module.code.ts"
import { valueAt } from "akasha/pages/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import {
  identifyingFrom,
  sourceOver,
} from "akasha/pages/types/modules/declared-properties/declared-properties.module.code.ts"
import { textOnDisk } from "akasha/utils/fs/modules/text-on-disk/text-on-disk.module.code.ts"

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

function bodiesUnder(tree: string): readonly Bodied[] {
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
  if (put) {
    mkdirSync(root, { recursive: true })
    dropBuilt(root)
  }
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
  const identity = held.flatMap((one) => identityIn(one.value, one.path, repo, identifying))
  const drift = [reconcile(identity, root, put, done)]
  const valued = held.flatMap((one) => valueIn(one.value, one.path, repo))
  drift.push(reconcile(valued, root, put, done))
  const shaped = values.flatMap((one) => shapeFiled(one))
  drift.push(reconcile(shaped, root, put, done))
  const carrying = shapesFiled(source, shapesIn(values), pageTypeSlugsIn(values))
  drift.push(reconcile(carrying, root, put, done))
  const known = knownIn(readingBuilding(root), (path) => valueAt(path, repo))
  const beside = bodiesAt(repo)
  const filed = held.map((one) =>
    edgeIn(
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
  const ruled = [...walked.flatMap((one) => ruleIn(one.body, one.path, repo)), readerIn()]
  drift.push(reconcile(ruled, root, put, done))
  const every = [...identity, ...valued, ...shaped, ...carrying, ...relation, ...imported, ...ruled]
  const went = takenAway(every, root, put, done)
  if (put) keepBuilt(root)
  return {
    pages: held.length,
    entries:
      identity.length +
      relation.length +
      imported.length +
      ruled.length +
      valued.length +
      shaped.length +
      carrying.length,
    refused: filed.flatMap((one) => one.refused),
    drift: drifting(drift, went),
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
      const found = settlingOver(readingBuilding(root, repo), repo, moving, (path) =>
        valueAt(path, repo)
      )
      filedInto(root, found.filings)
      return [...found.noted, ...found.refusedBefore, ...found.refused]
    },
  }
}
