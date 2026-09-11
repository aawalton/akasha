import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { onDisk } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged, Running } from "akasha/checks/modules/judging/judging.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import { said as git } from "akasha/git/running/git-running.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import {
  listedFiled,
  pathFiled,
  relationFiled,
  schemaFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { type Shadow, shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

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
  const said = above === null ? "[]" : JSON.stringify([`${PAGE_TYPE}/${above}`])
  writeFileSync(
    join(root, path),
    `export const held = { id: ${JSON.stringify(`id-${slug}`)},` +
      ` pageTypeSlug: ${JSON.stringify(PAGE_TYPE)}, slug: ${JSON.stringify(slug)},` +
      ` extends: ${said}, properties: [${declared(declares)}] }\n`
  )
  valueAlsoFiled(root, PAGE_TYPE, [
    {
      path,
      value: {
        id: `id-${slug}`,
        pageTypeSlug: PAGE_TYPE,
        slug,
        extends: above === null ? [] : [`${PAGE_TYPE}/${above}`],
        properties: declares.map((one) => ({ pagePropertySlug: one })),
      },
    },
  ])
}

export type Shape = {
  readonly pageTypeSlug: string
  readonly targetPageTypeSlug?: string | null
  readonly unique?: string | null
  readonly uniquePropertySlug?: string | null
  readonly fileName?: string | null
  readonly folderName?: string | null
}

export function declaring(root: string, slug: string, shape: Shape): undefined {
  schemaFiled(root, shape.pageTypeSlug, slug, [
    {
      pageTypeSlug: shape.pageTypeSlug,
      targetPageTypeSlug: shape.targetPageTypeSlug ?? null,
      unique: shape.unique ?? null,
      uniquePropertySlug: shape.uniquePropertySlug ?? null,
      slug,
      propertySlug: slug,
      fileName: shape.fileName ?? null,
      folderName: shape.folderName ?? null,
    },
  ])
}

export function identifying(root: string): undefined {
  declaring(root, ID, { pageTypeSlug: "text-property", unique: PAGE })
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

export function carrying(
  root: string,
  slug: string,
  declares: readonly string[],
  above: string | null = null
): undefined {
  const path = pathFor(PAGE_TYPE, slug)
  valueAlsoFiled(root, PAGE_TYPE, [
    {
      path,
      value: {
        id: `id-${slug}`,
        pageTypeSlug: PAGE_TYPE,
        slug,
        extends: above === null ? [] : [`${PAGE_TYPE}/${above}`],
        properties: declares.map((one) => ({ pagePropertySlug: one })),
      },
    },
  ])
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

export function wrote(root: string, files: Readonly<Record<string, string>>): string {
  for (const [path, said] of Object.entries(files)) writing(root, path, said)
  return root
}

export function tracked(root: string, files: Readonly<Record<string, string>> = {}): string {
  wrote(root, files)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}

export function treed(root: string): string {
  git(root, ["init", "--quiet"])
  git(root, ["add", "-A"])
  return root
}

export function shadowed(over: Change): Shadow {
  const cast = shadowFor(over)
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow
}

export function judgingBy(running: Running): (over: Change) => readonly Judged[] {
  return (over: Change): readonly Judged[] => running(over, shadowed(over))
}
