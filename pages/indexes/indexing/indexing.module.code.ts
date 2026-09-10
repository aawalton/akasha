import { mkdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { typed } from "@akasha/code/code-typing"
import { identifyingFrom, sourceOver } from "@akasha/pages/page-type-properties"
import { type Value, valueAt } from "@akasha/pages/page-value"
import { DECLARING_UNDER, declaredOf } from "../declaring/index-declaring.index.code.ts"
import {
  fileKeysIn,
  filePropertiesIn,
  folderPropertiesIn,
  uncommittedFiledIn,
  uniquePropertiesIn,
} from "../entries/index-entries.module.code.ts"
import { identityIn } from "../identity/index-identity.index.code.ts"
import { indexIdentity } from "../identity/index-identity.index.ts"
import { importIn } from "../import/index-import.index.code.ts"
import { indexImport } from "../import/index-import.index.ts"
import { refusingEmpty, settlingOver } from "../index-settling/index-settling.module.code.ts"
import { LISTED_UNDER, listedOf } from "../listing/index-listing.index.code.ts"
import { reachingBuilt } from "../package-reaching/package-reaching.module.code.ts"
import { claimingIn } from "../path/index-path.index.code.ts"
import { indexPath } from "../path/index-path.index.ts"
import { sidecarsIn } from "../path-claiming/path-claiming.module.code.ts"
import { knownIn } from "../reaching/reaching.module.code.ts"
import {
  type Drift,
  keepWhole,
  reconcile,
  sweptBeside,
} from "../rebuilding/rebuilding.module.code.ts"
import { relationIn } from "../relation/index-relation.index.code.ts"
import { indexRelation } from "../relation/index-relation.index.ts"
import { schemaIn } from "../schema/index-schema.index.code.ts"
import { indexSchema } from "../schema/index-schema.index.ts"
import type { Filing } from "../shape/index-shape.module.code.ts"
import { indexIn, readingAt } from "../surface/index-surface.module.code.ts"
import { pagesUnder, walkedUnder } from "../tree-reading/tree-reading.module.code.ts"
import { valueIn } from "../value/index-value.index.code.ts"
import { indexValue } from "../value/index-value.index.ts"

const IDENTITY = indexIdentity.name

const IMPORT = indexImport.name

const PATH = indexPath.name

const RELATION = indexRelation.name

const SCHEMA = indexSchema.name

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

export type Rebuilt = {
  readonly pages: number
  readonly entries: number
  readonly refused: readonly string[]
  readonly drift: Drift
  readonly swept: readonly string[]
}

function drifting(said: readonly Drift[]): Drift {
  return {
    added: said.flatMap((one) => one.added),
    changed: said.flatMap((one) => one.changed),
    went: said.flatMap((one) => one.went),
  }
}

export function rebuiltFrom(tree: string, root: string, repo: string, put = true): Rebuilt {
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
  const schema = held.flatMap((one) => schemaIn(one.value))
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
  drift.push(reconcile(join(root, LISTED_UNDER), listedOf(paths), root, put))
  drift.push(reconcile(join(root, SCHEMA), schema, root, put))
  drift.push(reconcile(join(root, DECLARING_UNDER), declaredOf(schema), root, put))
  const valued = held.flatMap((one) => valueIn(one.value, one.path, repo))
  drift.push(reconcile(join(root, VALUE), valued, root, put))
  const known = knownIn(readingAt(root), (path) => valueAt(path, repo))
  const filed = held.map((one) => relationIn(one.value, one.path, known, repo))
  const relation = filed.flatMap((one) => one.entries)
  drift.push(reconcile(join(root, RELATION), relation, root, put))
  const naming = reachingBuilt(held, repo, fileProperties, filedBy)
  const imported = walkedUnder(tree, typed).flatMap((path) =>
    importIn(readFileSync(path, "utf8"), path, repo, naming)
  )
  drift.push(reconcile(join(root, IMPORT), imported, root, put))
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
    drift: drifting(drift),
    swept: [],
  }
}

export function rebuiltWhole(repo: string, tree: string, put: boolean): Rebuilt {
  const root = indexIn(repo)
  const swept = sweptBeside(root, put)
  return { ...rebuiltFrom(tree, root, repo, put), swept }
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
      return [...found.noted, ...found.refused]
    },
  }
}
