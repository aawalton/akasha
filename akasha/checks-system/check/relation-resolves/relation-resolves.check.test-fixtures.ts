import { appendFileSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import type { Leaving } from "../../judging/judging.module.code.ts"

export const INDEX = join(".git", "data", "index")

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
  "page-type-slug": { pageTypeSlug: "relation-property", targetPageTypeSlug: "page-type" },
  "domain-slug": { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain" },
  "spark-slug": { pageTypeSlug: "relation-property", targetPageTypeSlug: "spark" },
  "part-slugs": { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain" },
  definition: { pageTypeSlug: "text-property", targetPageTypeSlug: null },
  marks: { pageTypeSlug: "record-property", targetPageTypeSlug: null },
}

export const M = "akasha/t/marks.record-property.ts"

export const M_ID = "01a04d99-71ca-7e06-8000-00000000000a"

export const scratch = scratchWorld()

export function put(root: string, at: string, body: string): void {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, body, "utf8")
}

export function filed(root: string, at: string, line: string): void {
  const full = join(root, INDEX, at)
  mkdirSync(dirname(full), { recursive: true })
  appendFileSync(full, `${line}\n`, "utf8")
}

export function stating(
  id: string,
  slug: string,
  pageTypeSlug: string,
  stated: string = ""
): string {
  return `export const it = { id: "${id}", slug: "${slug}", pageTypeSlug: "${pageTypeSlug}"${stated} }\n`
}

export function standing(
  root: string,
  path: string,
  id: string,
  pageTypeSlug: string,
  slug: string
): void {
  const line = JSON.stringify({ path, id })
  filed(root, join("identity", "page", "id", `${id}.jsonl`), line)
  filed(root, join("identity", pageTypeSlug, "slug", `${slug}.jsonl`), line)
  filed(root, join("path", `${path}.jsonl`), line)
}

export function naming(
  root: string,
  target: string,
  propertySlug: string,
  id: string,
  path: string
): void {
  filed(
    root,
    join("relation", "page", "id", target, propertySlug, `${id}.jsonl`),
    JSON.stringify({ path })
  )
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
    put(root, path, stating(id, slug, "page-type", `, extendsSlug: ${said}${dies}`))
    standing(root, path, id, "page-type", slug)
  }
  for (const [slug, shape] of Object.entries(SCHEMA)) {
    filed(root, join("schema", "page-property", "slug", `${slug}.jsonl`), JSON.stringify(shape))
  }
  put(
    root,
    M,
    stating(M_ID, "marks", "record-property", ', properties: [{ pagePropertySlug: "domain-slug" }]')
  )
  standing(root, M, M_ID, "record-property", "marks")
  if (carrying) standing(root, D, D_ID, "domain", "d")
  return root
}

export function over(
  root: string,
  changed: readonly string[],
  bodies: Record<string, string | null>
): Leaving {
  const encoder = new TextEncoder()
  const at = (path: string): Uint8Array | null => {
    const said = bodies[path]
    if (said === undefined || said === null) return null
    return encoder.encode(said)
  }
  return {
    root,
    changed,
    at,
    was: at,
  }
}

export function note(stated: string): Record<string, string | null> {
  return { [A]: stating(A_ID, "a", "note", stated) }
}

export function spark(stated: string): Record<string, string | null> {
  return { [S]: stating(S_ID, "s", "spark", stated) }
}
