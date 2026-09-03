import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  listedFiled,
  pathFiled,
  relationFiled,
  schemaFiled,
  valueAlsoFiled,
} from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages-system/change"
import { bytesOf } from "@akasha/testing-system/bodying"
import { onDisk } from "../change-walking/change-walking.module.code.ts"

const PAGE_TYPE = "page-type"

const PAGE = "page"

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

function declared(slugs: readonly string[]): string {
  return slugs
    .map((one) => `{ pagePropertySlug: ${JSON.stringify(one)}, required: false, many: false }`)
    .join(", ")
}

export function typed(
  root: string,
  slug: string,
  above: string | null,
  declares: readonly string[] = []
): undefined {
  const path = `${TYPES_AT}/${slug}.${PAGE_TYPE}.ts`
  listedFiled(root, PAGE_TYPE, slug, [{ path, id: `id-${slug}` }])
  mkdirSync(join(root, TYPES_AT), { recursive: true })
  const said = above === null ? "null" : JSON.stringify(`${PAGE_TYPE}/${above}`)
  writeFileSync(
    join(root, path),
    `export const held = { slug: ${JSON.stringify(slug)}, extendsSlug: ${said},` +
      ` properties: [${declared(declares)}] }\n`
  )
  // what a page type declares is read from its value, so a world that types one files it
  valueAlsoFiled(root, PAGE_TYPE, [
    {
      path,
      value: {
        id: `id-${slug}`,
        pageTypeSlug: PAGE_TYPE,
        slug,
        extendsSlug: above === null ? null : `${PAGE_TYPE}/${above}`,
        properties: declares.map((one) => ({ pagePropertySlug: one })),
      },
    },
  ])
}

export type Shape = {
  readonly pageTypeSlug: string
  readonly targetPageTypeSlug?: string | null
  readonly unique?: string | null
  readonly fileName?: string | null
}

export function declaring(root: string, slug: string, shape: Shape): undefined {
  schemaFiled(root, shape.pageTypeSlug, slug, [
    {
      pageTypeSlug: shape.pageTypeSlug,
      targetPageTypeSlug: shape.targetPageTypeSlug ?? null,
      unique: shape.unique ?? null,
      slug,
      propertySlug: slug,
      fileName: shape.fileName ?? null,
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

export function founded(root: string): undefined {
  identifying(root)
  typed(root, PAGE, null, [ID, SLUG, "page-type-slug"])
}

export function filing(root: string, kind: string, slug: string, id: string): undefined {
  listedFiled(root, kind, slug, [{ path: pathFor(kind, slug), id }])
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
): Change {
  const disk = onDisk(root)
  return {
    root,
    changed: Object.keys(files),
    after: (path) => (path in files ? (files[path] ?? null) : disk(path)),
    before: (path) => before[path] ?? (path in files ? NO_BYTES : disk(path)),
  }
}

export function gone(): null {
  return null
}

export function change(
  root: string,
  changed: readonly string[],
  at: (path: string) => Uint8Array | null = onDisk(root)
): Change {
  return { root, changed, before: at, after: at }
}

export function proposing(
  root: string,
  path: string,
  body: string
): (at: string) => Uint8Array | null {
  const disk = onDisk(root)
  return (at: string): Uint8Array | null => (at === path ? bytesOf(body) : disk(at))
}
