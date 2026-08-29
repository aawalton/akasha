import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../command-system/scratching.module.code.ts"
import { id as idPage } from "../page/properties/id.text-property.ts"
import { slug as slugPage } from "../page/properties/slug.text-property.ts"
import type { Shaped } from "./index-entries.module.code.ts"

export const A = "01a04b79-0000-7000-8000-00000000000a"
export const B = "01a04b79-0000-7000-8000-00000000000b"
export const C = "01a04b79-0000-7000-8000-00000000000c"
export const D = "01a04b79-0000-7000-8000-00000000000d"

export const SCHEMA = {
  code: '{"pageTypeSlug":"file-property","targetPageTypeSlug":null,"unique":null}',
  domainSlug: '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"domain","unique":null}',
  partSlugs: '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"domain","unique":null}',
  id: JSON.stringify({
    pageTypeSlug: idPage.pageTypeSlug,
    targetPageTypeSlug: null,
    unique: idPage.unique,
  }),
  slug: JSON.stringify({
    pageTypeSlug: slugPage.pageTypeSlug,
    targetPageTypeSlug: null,
    unique: slugPage.unique,
  }),
} as const

export const scratch = scratchWorld()

export function grounded(): { readonly root: string; readonly repo: string } {
  const repo = scratch.rootFor("akasha-entries-repo-")
  const root = scratch.rootFor("akasha-entries-root-")
  const page = (at: string, value: Record<string, unknown>): void => {
    writeFileSync(join(repo, at), `export const it = ${JSON.stringify(value)} as const\n`)
  }
  const filed = (at: string, line: string): void => {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), `${line}\n`)
  }
  page("domain.page-type.ts", {
    id: "1",
    pageTypeSlug: "page-type",
    slug: "domain",
    extendsSlug: "page",
  })
  page("module.page-type.ts", {
    id: "2",
    pageTypeSlug: "page-type",
    slug: "module",
    extendsSlug: "domain",
  })
  page("parts.record-property.ts", {
    id: "3",
    pageTypeSlug: "record-property",
    slug: "parts",
    properties: [{ pagePropertySlug: "page-property/part-slugs", required: true, many: true }],
  })
  filed("identity/page-type/slug/domain.jsonl", '{"path":"domain.page-type.ts","id":"1"}')
  filed("identity/page-type/slug/module.jsonl", '{"path":"module.page-type.ts","id":"2"}')
  filed("identity/record-property/slug/parts.jsonl", '{"path":"parts.record-property.ts","id":"3"}')
  filed("schema/page-property/slug/code.jsonl", SCHEMA.code)
  filed("schema/page-property/slug/domain-slug.jsonl", SCHEMA.domainSlug)
  filed("schema/page-property/slug/part-slugs.jsonl", SCHEMA.partSlugs)
  filed("schema/page-property/slug/id.jsonl", SCHEMA.id)
  filed("schema/page-property/slug/slug.jsonl", SCHEMA.slug)
  return { root, repo }
}

export function standing(pages: Readonly<Record<string, string>>): Shaped {
  return {
    targetOf: (propertySlug) => (propertySlug === "part-slugs" ? "domain" : null),
    admitting: (target) => (target === "domain" ? ["domain", "module"] : []),
    at: (pageTypeSlug, slug) => {
      const id = pages[`${pageTypeSlug}/${slug}`]
      return id === undefined ? [] : [{ path: `${slug}.${pageTypeSlug}.ts`, id }]
    },
    byId: () => null,
    fieldsOf: (propertySlug) => (propertySlug === "parts" ? ["part-slugs"] : []),
  }
}
