import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  idFiled,
  pathFiled,
  relationFiled,
  schemaFiled,
  standingFiled,
} from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { bytesOf } from "../../testing-system/bodying/bodying.module.code.ts"
import { onDisk } from "../checking/checking.module.code.ts"
import type { Leaving } from "../judging/judging.module.code.ts"

const PAGE_TYPE = "page-type"

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

export function typed(root: string, slug: string, above: string): undefined {
  const path = `${TYPES_AT}/${slug}.${PAGE_TYPE}.ts`
  standingFiled(root, PAGE_TYPE, slug, [{ path, id: `id-${slug}` }])
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
  schemaFiled(root, slug, [
    {
      pageTypeSlug: shape.pageTypeSlug,
      targetPageTypeSlug: shape.targetPageTypeSlug ?? null,
      unique: shape.unique ?? null,
    },
  ])
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
  standingFiled(root, kind, slug, [{ path: pathFor(kind, slug), id }])
}

export function identified(root: string, id: string, path: string): undefined {
  idFiled(root, id, [{ path, id }])
}

export function claiming(root: string, path: string, page: string, id: string): undefined {
  pathFiled(root, path, [{ path: page, id }])
}

export function edging(
  root: string,
  id: string,
  propertySlug: string,
  from: string,
  at: string
): undefined {
  relationFiled(root, id, propertySlug, from, [{ path: at }])
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
