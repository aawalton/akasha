import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { id as idPage } from "../../page/properties/id.text-property.ts"
import { slug as slugPage } from "../../page/properties/slug.text-property.ts"
import type { Shaped } from "../reaching/reaching.module.code.ts"

export const A = "01a04b79-0000-7000-8000-00000000000a"
export const B = "01a04b79-0000-7000-8000-00000000000b"
export const C = "01a04b79-0000-7000-8000-00000000000c"
export const D = "01a04b79-0000-7000-8000-00000000000d"

export const SCHEMA = {
  code:
    '{"pageTypeSlug":"file-property","targetPageTypeSlug":null,"unique":null,' +
    '"slug":"code","propertySlug":"code"}',
  domainSlug:
    '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"domain","unique":null,' +
    '"slug":"domain-slug","propertySlug":"domain-slug"}',
  partSlugs:
    '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"domain","unique":null,' +
    '"slug":"part-slugs","propertySlug":"part-slugs"}',
  id: JSON.stringify({
    pageTypeSlug: idPage.pageTypeSlug,
    targetPageTypeSlug: null,
    unique: idPage.unique,
    slug: idPage.slug,
    propertySlug: idPage.propertySlug,
  }),
  slug: JSON.stringify({
    pageTypeSlug: slugPage.pageTypeSlug,
    targetPageTypeSlug: null,
    unique: slugPage.unique,
    slug: slugPage.slug,
    propertySlug: slugPage.propertySlug,
  }),
} as const

export const scratch = scratchWorld()

export function grounded(): { readonly root: string; readonly repo: string } {
  const repo = scratch.rootFor("akasha-entries-repo-")
  const root = scratch.rootFor("akasha-entries-root-")
  const page = (at: string, value: Record<string, unknown>): undefined => {
    writeFileSync(join(repo, at), `export const it = ${JSON.stringify(value)} as const\n`)
  }
  const filed = (at: string, line: string): undefined => {
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
  filed("schema/page-property/file-property/slug/code.jsonl", SCHEMA.code)
  filed("schema/page-property/relation-property/slug/domain-slug.jsonl", SCHEMA.domainSlug)
  filed("schema/page-property/relation-property/slug/part-slugs.jsonl", SCHEMA.partSlugs)
  filed(`schema/page-property/${idPage.pageTypeSlug}/slug/id.jsonl`, SCHEMA.id)
  filed(`schema/page-property/${slugPage.pageTypeSlug}/slug/slug.jsonl`, SCHEMA.slug)
  return { root, repo }
}

const TARGETS: Readonly<Record<string, string>> = {
  "part-slugs": "domain",
  "noted-slugs": "domain",
}

const KEYED: Readonly<Record<string, string>> = {
  partSlugs: "part-slugs",
  notes: "noted-slugs",
  parts: "parts",
  heldSlugs: "held-slugs",
  holds: "holds",
  inner: "inner",
}

export function standing(pages: Readonly<Record<string, string>>): Shaped {
  return {
    targetOf: (propertySlug) => TARGETS[propertySlug] ?? null,
    admitting: (target) => (target === "domain" ? ["domain", "module"] : []),
    at: (pageTypeSlug, slug) => {
      const id = pages[`${pageTypeSlug}/${slug}`]
      return id === undefined ? [] : [{ path: `${slug}.${pageTypeSlug}.ts`, id }]
    },
    byId: () => null,
    fieldsOf: (propertySlug) => (propertySlug === "parts" ? ["part-slugs"] : []),
    slugOfKey: (key) => KEYED[key] ?? null,
  }
}
