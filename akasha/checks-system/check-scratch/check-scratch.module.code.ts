import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { indexIdentity } from "../../pages-system/indexes/index/index-identity/index-identity.index.ts"
import { indexRelation } from "../../pages-system/indexes/index/index-relation/index-relation.index.ts"
import { indexAt } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Leaving } from "../judging/judging.module.code.ts"

const IDENTITY = indexIdentity.indexName

const RELATION = indexRelation.indexName

const PAGE = "page"

const PAGE_TYPE = "page-type"

const SLUG = "slug"

const ID = "id"

const TYPES_AT = "akasha/types"

export const NO_BYTES = new Uint8Array(0)

export function pathFor(kind: string, slug: string): string {
  return `akasha/${slug}.${kind}.ts`
}

function filed(root: string, under: string, name: string, line: unknown): void {
  const dir = join(root, under)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${name}.jsonl`), `${JSON.stringify(line)}\n`)
}

export function typed(root: string, slug: string, above: string): void {
  const path = `${TYPES_AT}/${slug}.${PAGE_TYPE}.ts`
  filed(root, indexAt(IDENTITY, PAGE_TYPE, SLUG), slug, { path, id: `id-${slug}` })
  mkdirSync(join(root, TYPES_AT), { recursive: true })
  const said = JSON.stringify(`${PAGE_TYPE}/${above}`)
  writeFileSync(
    join(root, path),
    `export const held = { slug: ${JSON.stringify(slug)}, extendsSlug: ${said} }\n`
  )
}

export function stands(root: string, kind: string, slug: string, id: string): void {
  filed(root, indexAt(IDENTITY, kind, SLUG), slug, { path: pathFor(kind, slug), id })
}

export function identified(root: string, id: string, path: string): void {
  filed(root, indexAt(IDENTITY, PAGE, ID), id, { path, id })
}

export function edging(
  root: string,
  id: string,
  propertySlug: string,
  from: string,
  at: string
): void {
  filed(root, indexAt(RELATION, PAGE, ID, id, propertySlug), from, { path: at })
}

export function landing(
  root: string,
  files: Readonly<Record<string, Uint8Array | null>>,
  before: Readonly<Record<string, Uint8Array>> = {}
): Leaving {
  return {
    root,
    changed: Object.keys(files),
    at: (path) => files[path] ?? null,
    was: (path) => before[path] ?? NO_BYTES,
  }
}
