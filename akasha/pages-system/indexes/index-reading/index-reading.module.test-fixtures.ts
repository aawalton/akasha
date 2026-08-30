import { appendFileSync, cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { indexIdentity } from "../index/index-identity/index-identity.index.ts"
import { indexImport } from "../index/index-import/index-import.index.ts"
import { indexPath } from "../index/index-path/index-path.index.ts"
import { indexRelation } from "../index/index-relation/index-relation.index.ts"
import { indexSchema } from "../index/index-schema/index-schema.index.ts"
import type { Entry } from "../index-entries/index-entries.module.code.ts"
import { type Stamp, stampKept } from "../index-stamp/index-stamp.module.code.ts"
import { indexIn } from "./index-reading.module.code.ts"

const ENDING = ".jsonl"

const PAGE = "page"

const ID = "id"

const SLUG = "slug"

const PAGE_PROPERTY = "page-property"

const AT_PATH = "path"

const PART = ".4242.part"

function under(root: string, at: string): string {
  return join(indexIn(root), at)
}

function written(root: string, at: string, lines: readonly unknown[]): undefined {
  const path = under(root, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, lines.map((one) => `${JSON.stringify(one)}\n`).join(""))
}

function filing(root: string, at: string, lines: readonly unknown[]): undefined {
  written(root, `${at}${ENDING}`, lines)
}

function standing(root: string, at: string): undefined {
  mkdirSync(under(root, at), { recursive: true })
}

function taking(root: string, at: string): undefined {
  rmSync(under(root, at), { recursive: true, force: true })
}

function identityFiled(
  root: string,
  scope: string,
  propertySlug: string,
  said: string,
  lines: readonly unknown[]
): undefined {
  filing(root, join(indexIdentity.indexName, scope, propertySlug, said), lines)
}

export function standingFiled(
  root: string,
  pageTypeSlug: string,
  slug: string,
  lines: readonly unknown[]
): undefined {
  identityFiled(root, pageTypeSlug, SLUG, slug, lines)
}

export function idFiled(root: string, id: string, lines: readonly unknown[]): undefined {
  identityFiled(root, PAGE, ID, id, lines)
}

export function pathFiled(root: string, path: string, lines: readonly unknown[]): undefined {
  filing(root, join(indexPath.indexName, path), lines)
}

export function schemaFiled(
  root: string,
  propertySlug: string,
  lines: readonly unknown[]
): undefined {
  filing(root, join(indexSchema.indexName, PAGE_PROPERTY, SLUG, propertySlug), lines)
}

export function relationFiled(
  root: string,
  id: string,
  propertySlug: string,
  from: string,
  lines: readonly unknown[]
): undefined {
  filing(root, join(indexRelation.indexName, PAGE, ID, id, propertySlug, from), lines)
}

export function importFiled(root: string, path: string, lines: readonly unknown[]): undefined {
  filing(root, join(indexImport.indexName, AT_PATH, path), lines)
}

export function importPartLeft(root: string, path: string, lines: readonly unknown[]): undefined {
  written(root, join(indexImport.indexName, AT_PATH, `${path}${ENDING}${PART}`), lines)
}

export function noneOfTypeFiled(root: string, pageTypeSlug: string): undefined {
  standing(root, join(indexIdentity.indexName, pageTypeSlug, SLUG))
}

export function noPathsFiled(root: string): undefined {
  standing(root, indexPath.indexName)
}

export function noImportersFiled(root: string): undefined {
  standing(root, join(indexImport.indexName, AT_PATH))
}

export function entriesFiled(root: string, entries: readonly Entry[]): undefined {
  for (const one of entries) {
    const path = under(root, one.at)
    mkdirSync(dirname(path), { recursive: true })
    appendFileSync(path, `${one.line}\n`)
  }
}

export function stampedIn(root: string, held: Stamp): undefined {
  stampKept(indexIn(root), held)
}

export function identitiesCopied(from: string, into: string, pageTypeSlug: string): undefined {
  const at = join(indexIdentity.indexName, pageTypeSlug)
  cpSync(under(from, at), under(into, at), { recursive: true })
}

export function standingTakenFrom(root: string, pageTypeSlug: string, slug: string): undefined {
  taking(root, join(indexIdentity.indexName, pageTypeSlug, SLUG, `${slug}${ENDING}`))
}

export function importsStanding(root: string): boolean {
  return existsSync(under(root, indexImport.indexName))
}

export function idTakenFrom(root: string, id: string): undefined {
  taking(root, join(indexIdentity.indexName, PAGE, ID, `${id}${ENDING}`))
}

export function identitiesTakenFrom(root: string, pageTypeSlug: string): undefined {
  taking(root, join(indexIdentity.indexName, pageTypeSlug))
}

export function pathsTakenFrom(root: string): undefined {
  taking(root, indexPath.indexName)
}

export function importsTakenFrom(root: string): undefined {
  taking(root, indexImport.indexName)
}
