import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing as wrote } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import type { Change } from "../../../pages-system/change/change.module.code.ts"
import {
  idFiled,
  pathFiled,
  relationFiled,
  schemaFiled,
  standingAlsoFiled,
} from "../../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"

export const A = "akasha/t/a.note.ts"

export const D = "akasha/t/d.domain.ts"

export const E = "akasha/t/e.domain.ts"

export const OTHER = "akasha/t/other.domain.ts"

export const S = "akasha/t/s.spark.ts"

export const T = "akasha/t/t.spark.ts"

export const A_ID = "01a04d99-71ca-7e06-8000-000000000001"

export const D_ID = "01a04d99-71ca-7e06-8000-000000000002"

export const E_ID = "01a04d99-71ca-7e06-8000-000000000003"

export const OTHER_ID = "01a04d99-71ca-7e06-8000-000000000004"

export const NOWHERE_ID = "01a04d99-71ca-7e06-8000-00000000ffff"

export const S_ID = "01a04d99-71ca-7e06-8000-000000000005"

export const T_ID = "01a04d99-71ca-7e06-8000-000000000006"

export const TYPES: readonly (readonly [string, string | null, boolean])[] = [
  ["page-type", null, false],
  ["domain", "page-type/page-type", false],
  ["note", "page-type/domain", false],
  ["spark", "page-type/domain", true],
]

export const SCHEMA: Record<string, Record<string, string | null>> = {
  id: { pageTypeSlug: "text-property", targetPageTypeSlug: null, unique: "always" },
  slug: { pageTypeSlug: "text-property", targetPageTypeSlug: null, unique: "page-type" },
  "page-type-slug": {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "page-type",
    unique: null,
  },
  "domain-slug": { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain", unique: null },
  "spark-slug": { pageTypeSlug: "relation-property", targetPageTypeSlug: "spark", unique: null },
  "part-slugs": { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain", unique: null },
  definition: { pageTypeSlug: "text-property", targetPageTypeSlug: null, unique: null },
  marks: { pageTypeSlug: "record-property", targetPageTypeSlug: null, unique: null },
}

export const M = "akasha/t/marks.record-property.ts"

export const M_ID = "01a04d99-71ca-7e06-8000-00000000000a"

export const scratch = scratchWorld()

export function stating(
  id: string,
  slug: string,
  pageTypeSlug: string,
  stated: string = ""
): string {
  const read = pageTypeSlug.endsWith("-property") ? `, propertySlug: "${slug}"` : ""
  return `export const it = { id: "${id}", slug: "${slug}", pageTypeSlug: "${pageTypeSlug}"${read}${stated} }\n`
}

export function standing(
  root: string,
  path: string,
  id: string,
  pageTypeSlug: string,
  slug: string,
  body: string = stating(id, slug, pageTypeSlug)
): undefined {
  if (!existsSync(join(root, path))) wrote(root, path, body)
  const held = [{ path, id }]
  idFiled(root, id, held)
  standingAlsoFiled(root, pageTypeSlug, slug, held)
  pathFiled(root, path, held)
}

export function naming(
  root: string,
  target: string,
  propertySlug: string,
  id: string,
  path: string
): undefined {
  relationFiled(root, target, propertySlug, id, [{ path }])
}

export function rooted(carrying: boolean = true): string {
  const root = scratch.rootFor("akasha-relation-resolves-")
  let count = 0
  for (const [slug, extendsSlug, mortal] of TYPES) {
    count += 1
    const path = `akasha/t/${slug}.page-type.ts`
    const id = `01a04d99-71ca-7e06-9000-00000000000${count}`
    const said = extendsSlug === null ? "null" : `"${extendsSlug}"`
    const dies = mortal ? ", mortal: true" : ""
    standing(
      root,
      path,
      id,
      "page-type",
      slug,
      stating(id, slug, "page-type", `, extendsSlug: ${said}${dies}`)
    )
  }
  for (const [slug, shape] of Object.entries(SCHEMA)) {
    schemaFiled(root, String(shape.pageTypeSlug), slug, [{ ...shape, slug, propertySlug: slug }])
  }
  standing(
    root,
    M,
    M_ID,
    "record-property",
    "marks",
    stating(M_ID, "marks", "record-property", ', properties: [{ pagePropertySlug: "domain-slug" }]')
  )
  if (carrying) standing(root, D, D_ID, "domain", "d")
  return root
}

export function over(
  root: string,
  changed: readonly string[],
  bodies: Record<string, string | null>
): Change {
  const encoder = new TextEncoder()
  const at = (path: string): Uint8Array | null => {
    const said = bodies[path]
    if (said === undefined || said === null) return null
    return encoder.encode(said)
  }
  const was = (path: string): Uint8Array | null => {
    const full = join(root, path)
    return existsSync(full) ? new Uint8Array(readFileSync(full)) : null
  }
  return { root, changed, after: at, before: was }
}

export function note(stated: string): Record<string, string | null> {
  return { [A]: stating(A_ID, "a", "note", stated) }
}

export function spark(stated: string): Record<string, string | null> {
  return { [S]: stating(S_ID, "s", "spark", stated) }
}
