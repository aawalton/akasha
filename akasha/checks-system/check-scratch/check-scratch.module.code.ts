import { mkdirSync, writeFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { indexIdentity } from "../../pages-system/indexes/index/index-identity/index-identity.index.ts"
import { indexPath } from "../../pages-system/indexes/index/index-path/index-path.index.ts"
import { indexRelation } from "../../pages-system/indexes/index/index-relation/index-relation.index.ts"
import { indexSchema } from "../../pages-system/indexes/index/index-schema/index-schema.index.ts"
import { indexAt } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { bytesOf } from "../../testing-system/bodying/bodying.module.code.ts"
import { onDisk } from "../checking/checking.module.code.ts"
import type { Leaving } from "../judging/judging.module.code.ts"

const IDENTITY = indexIdentity.indexName

const PATH = indexPath.indexName

const RELATION = indexRelation.indexName

const SCHEMA = indexSchema.indexName

const PAGE = "page"

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

const SLUG = "slug"

const ID = "id"

const TYPES_AT = "akasha/types"

export const NO_BYTES = new Uint8Array(0)

export function pathFor(kind: string, slug: string): string {
  return `akasha/${slug}.${kind}.ts`
}

export function put(root: string, path: string, bytes: Uint8Array): Uint8Array {
  writeFileSync(join(root, path), bytes)
  return bytes
}

function filed(root: string, under: string, name: string, line: unknown): undefined {
  const dir = join(root, under)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${name}.jsonl`), `${JSON.stringify(line)}\n`)
}

export function typed(root: string, slug: string, above: string): undefined {
  const path = `${TYPES_AT}/${slug}.${PAGE_TYPE}.ts`
  filed(root, indexAt(IDENTITY, PAGE_TYPE, SLUG), slug, { path, id: `id-${slug}` })
  mkdirSync(join(root, TYPES_AT), { recursive: true })
  const said = JSON.stringify(`${PAGE_TYPE}/${above}`)
  writeFileSync(
    join(root, path),
    `export const held = { slug: ${JSON.stringify(slug)}, extendsSlug: ${said} }\n`
  )
}

export type Shape = {
  readonly pageTypeSlug: string
  readonly targetPageTypeSlug?: string | null
  readonly unique?: string | null
}

export function declaring(root: string, slug: string, shape: Shape): undefined {
  filed(root, indexAt(SCHEMA, PAGE_PROPERTY, SLUG), slug, {
    pageTypeSlug: shape.pageTypeSlug,
    targetPageTypeSlug: shape.targetPageTypeSlug ?? null,
    unique: shape.unique ?? null,
  })
}

export function identifying(root: string): undefined {
  declaring(root, ID, { pageTypeSlug: "text-property", unique: "always" })
  declaring(root, SLUG, { pageTypeSlug: "text-property", unique: PAGE_TYPE })
  declaring(root, "page-type-slug", {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: PAGE_TYPE,
  })
}

export function stands(root: string, kind: string, slug: string, id: string): undefined {
  filed(root, indexAt(IDENTITY, kind, SLUG), slug, { path: pathFor(kind, slug), id })
}

export function identified(root: string, id: string, path: string): undefined {
  filed(root, indexAt(IDENTITY, PAGE, ID), id, { path, id })
}

export function claiming(root: string, path: string, page: string, id: string): undefined {
  filed(root, indexAt(PATH, dirname(path)), basename(path), { path: page, id })
}

export function edging(
  root: string,
  id: string,
  propertySlug: string,
  from: string,
  at: string
): undefined {
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

export function gone(): null {
  return null
}

export function leaving(
  root: string,
  changed: readonly string[],
  at: (path: string) => Uint8Array | null = onDisk(root)
): Leaving {
  return { root, changed, at, was: at }
}

export function proposing(
  root: string,
  path: string,
  body: string
): (at: string) => Uint8Array | null {
  const disk = onDisk(root)
  return (at: string): Uint8Array | null => (at === path ? bytesOf(body) : disk(at))
}
