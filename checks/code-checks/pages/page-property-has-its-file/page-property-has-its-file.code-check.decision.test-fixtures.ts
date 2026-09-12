import {
  carrying,
  claiming,
  declaring,
  filing,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { noPathsFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const ID = "01a04d86-434f-7119-8000-000000000001"

export const PAGE = "akasha/a/held.module.ts"

export const CODE = "akasha/a/held.module.code.ts"

export const TEST = "akasha/a/held.module.test.ts"

export const BESIDE = new Map<string, string | null>([
  ["code", null],
  ["test", null],
  ["notes", null],
])

export const NAMED = new Map<string, string | null>([
  ["code", null],
  ["manifest", "package.json"],
])

export const scratch = scratchWorld()

export function rooted(
  fileProperties: readonly string[] = ["code", "test"],
  declares: readonly string[] = fileProperties
): string {
  const root = scratch.rootFor("akasha-property-filed-")
  noPathsFiled(root)
  for (const one of ["module", "check", "domain", "page-type"]) {
    filing(root, "page-type", one, `${ID.slice(0, -1)}${one.length}`)
    carrying(root, one, declares)
  }
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "page" })
  declaring(root, "slug", { pageTypeSlug: "text-property", unique: "page-type" })
  for (const one of fileProperties)
    declaring(root, one, { pageTypeSlug: "file-property", unique: null })
  declaring(root, "definition", { pageTypeSlug: "text-property", unique: null })
  return root
}

export function landed(root: string): undefined {
  for (const one of [PAGE, CODE]) claiming(root, one, PAGE, ID)
}

export function bodyText(
  stated: string,
  slug: string = "held",
  pageTypeSlug: string = "module",
  id: string = ID
): string {
  const read = pageTypeSlug.endsWith("-property") ? `, propertySlug: "${slug}"` : ""
  return `export const it = { id: "${id}", slug: "${slug}", pageTypeSlug: "${pageTypeSlug}"${read}${stated} }\n`
}

export function body(
  stated: string,
  slug: string = "held",
  pageTypeSlug: string = "module",
  id: string = ID
): Uint8Array {
  return new TextEncoder().encode(bodyText(stated, slug, pageTypeSlug, id))
}

export function over(
  root: string,
  changed: readonly string[],
  bodies: Record<string, Uint8Array | null>
): Change {
  return {
    root,
    changed,
    after: (path: string): Uint8Array | null =>
      path in bodies ? (bodies[path] ?? null) : new Uint8Array(0),
    before: (): null => null,
  }
}
