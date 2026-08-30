import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { indexIdentity } from "../index/index-identity/index-identity.index.ts"
import { indexImport } from "../index/index-import/index-import.index.ts"
import { indexPath } from "../index/index-path/index-path.index.ts"
import { indexRelation } from "../index/index-relation/index-relation.index.ts"
import { indexSchema } from "../index/index-schema/index-schema.index.ts"
import { indexIn } from "./index-reading.module.code.ts"

const ENDING = ".jsonl"

const PAGE = "page"

const ID = "id"

const SLUG = "slug"

const PAGE_PROPERTY = "page-property"

const AT_PATH = "path"

function filing(root: string, at: string, lines: readonly unknown[]): undefined {
  const path = join(indexIn(root), `${at}${ENDING}`)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, lines.map((one) => `${JSON.stringify(one)}\n`).join(""))
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
