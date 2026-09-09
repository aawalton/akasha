import { appendFileSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { id as idPage } from "@akasha/pages/page/id"
import { slug as slugPage } from "@akasha/pages/page/slug"
import type { Value } from "@akasha/pages/page-value"
import { DECLARING_AT } from "../declaring/index-declaring.index.code.ts"
import { claimsOf, type IsThere, sidecarsIn } from "../path-claiming/path-claiming.module.code.ts"
import type { Shaped } from "../reaching/reaching.module.code.ts"
import type { FilePropertiesBy } from "./index-entries.module.code.ts"

export const A = "01a04b79-0000-7000-8000-00000000000a"
export const B = "01a04b79-0000-7000-8000-00000000000b"
export const C = "01a04b79-0000-7000-8000-00000000000c"
export const D = "01a04b79-0000-7000-8000-00000000000d"

export const SCHEMA = {
  code:
    '{"pageTypeSlug":"file-property","targetPageTypeSlug":null,"unique":null,"uniquePropertySlug":null,' +
    '"slug":"code","propertySlug":"code","fileName":null,"folderName":null}',
  domainSlug:
    '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"domain","unique":null,"uniquePropertySlug":null,' +
    '"slug":"domain-slug","propertySlug":"domain-slug","fileName":null,"folderName":null}',
  partSlugs:
    '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"domain","unique":null,"uniquePropertySlug":null,' +
    '"slug":"part-slugs","propertySlug":"part-slugs","fileName":null,"folderName":null}',
  noteSlug:
    '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"note","unique":null,"uniquePropertySlug":null,' +
    '"slug":"note-slug","propertySlug":"note-slug","fileName":null,"folderName":null}',
  either:
    '{"pageTypeSlug":"one-of-property","targetPageTypeSlug":null,"unique":null,"uniquePropertySlug":null,' +
    '"slug":"either","propertySlug":"either","fileName":null,"folderName":null}',
  id: JSON.stringify({
    pageTypeSlug: idPage.pageTypeSlug,
    targetPageTypeSlug: null,
    unique: idPage.unique,
    uniquePropertySlug: null,
    slug: idPage.slug,
    propertySlug: idPage.propertySlug,
    fileName: null,
    folderName: null,
  }),
  slug: JSON.stringify({
    pageTypeSlug: slugPage.pageTypeSlug,
    targetPageTypeSlug: null,
    unique: slugPage.unique,
    uniquePropertySlug: null,
    slug: slugPage.slug,
    propertySlug: slugPage.propertySlug,
    fileName: null,
    folderName: null,
  }),
} as const

export const scratch = scratchWorld()

export function grounded(): { readonly root: string; readonly repo: string } {
  const repo = scratch.rootFor("akasha-entries-repo-")
  const root = scratch.rootFor("akasha-entries-root-")
  const kept = new Map<string, string[]>()
  const page = (at: string, value: Record<string, unknown>): undefined => {
    writeFileSync(join(repo, at), `export const it = ${JSON.stringify(value)} as const\n`)
    const type = String(value["pageTypeSlug"])
    kept.set(type, [...(kept.get(type) ?? []), JSON.stringify({ path: at, value })])
  }
  const filed = (at: string, line: string): undefined => {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), `${line}\n`)
  }
  page("domain.page-type.ts", {
    id: "1",
    pageTypeSlug: "page-type",
    slug: "domain",
    extendsSlug: ["page"],
  })
  page("module.page-type.ts", {
    id: "2",
    pageTypeSlug: "page-type",
    slug: "module",
    extendsSlug: ["domain"],
  })
  page("parts.record-property.ts", {
    id: "3",
    pageTypeSlug: "record-property",
    slug: "parts",
    properties: [{ pagePropertySlug: "page-property/part-slugs", required: true, many: true }],
  })
  filed("identity/page-type/page-type/slug/domain.jsonl", '{"path":"domain.page-type.ts","id":"1"}')
  filed("identity/page-type/page-type/slug/module.jsonl", '{"path":"module.page-type.ts","id":"2"}')
  page("either.one-of-property.ts", {
    id: "4",
    pageTypeSlug: "one-of-property",
    slug: "either",
    propertySlug: "either",
    members: ["relation-property/domain-slug", "relation-property/note-slug"],
  })
  filed(
    "identity/page-type/record-property/slug/parts.jsonl",
    '{"path":"parts.record-property.ts","id":"3"}'
  )
  filed(
    "identity/page-type/one-of-property/slug/either.jsonl",
    '{"path":"either.one-of-property.ts","id":"4"}'
  )
  const declared: readonly (readonly [string, string, string])[] = [
    ["file-property", "code", SCHEMA.code],
    ["relation-property", "domain-slug", SCHEMA.domainSlug],
    ["relation-property", "part-slugs", SCHEMA.partSlugs],
    ["relation-property", "note-slug", SCHEMA.noteSlug],
    ["one-of-property", "either", SCHEMA.either],
    [idPage.pageTypeSlug, "id", SCHEMA.id],
    [slugPage.pageTypeSlug, "slug", SCHEMA.slug],
  ]
  for (const [type, slug, line] of declared) {
    filed(`schema/page-property/${type}/slug/${slug}.jsonl`, line)
  }
  filed(DECLARING_AT, declared.map((one) => one[2]).join("\n"))
  for (const [type, lines] of kept) filed(`value/${type}.jsonl`, lines.join("\n"))
  return { root, repo }
}

const TARGETS: Readonly<Record<string, string | readonly string[]>> = {
  "part-slugs": "domain",
  "noted-slugs": "domain",
  "either-slug": ["domain", "note"],
  "gone-slugs": "note",
  "page-type-slug": "page-type",
}

const ADMITTING: Readonly<Record<string, readonly string[]>> = {
  domain: ["domain", "module"],
  note: ["note"],
  "page-type": ["page-type"],
}

const MORTAL: ReadonlySet<string> = new Set(["note"])

const SCOPING = { scopePropertySlug: "part-of-slugs", propertySlug: "slug" }

const KEYED: Readonly<Record<string, string>> = {
  partSlugs: "part-slugs",
  notes: "noted-slugs",
  goneSlugs: "gone-slugs",
  parts: "parts",
  heldSlugs: "held-slugs",
  holds: "holds",
  inner: "inner",
  pageTypeSlug: "page-type-slug",
}

export function shaped(pages: Readonly<Record<string, string>>): Shaped {
  return {
    targetOf: (propertySlug) => TARGETS[propertySlug] ?? null,
    admitting: (target) => ADMITTING[target] ?? [],
    mortal: (pageTypeSlug) => MORTAL.has(pageTypeSlug),
    scoping: () => SCOPING,
    filed: (address) => {
      if ("id" in address) return []
      const at =
        "scopeValue" in address
          ? `${address.pageTypeSlug}/${address.scopeValue}/${address.value}`
          : `${address.pageTypeSlug}/${address.value}`
      const id = pages[at]
      return id === undefined ? [] : [{ path: `${address.value}.${address.pageTypeSlug}.ts`, id }]
    },
    fieldsOf: (propertySlug) => (propertySlug === "parts" ? ["part-slugs"] : []),
    slugOfKeyIn: (_value, key) => KEYED[key] ?? null,
    fieldOfKey: (propertySlug, key) => {
      const slug = KEYED[key] ?? null
      const fields = propertySlug === "parts" ? ["part-slugs"] : []
      return slug !== null && fields.includes(slug) ? slug : null
    },
  }
}

export function filedAs(
  pageTypeSlug: string,
  said: Readonly<Record<string, string | null>>
): FilePropertiesBy {
  return new Map([[pageTypeSlug, new Map(Object.entries(said))]])
}

export function declaring(
  index: string,
  pageTypeSlug: string,
  slug: string,
  said: Record<string, unknown>
): undefined {
  const line = `${JSON.stringify(said)}\n`
  const at = join(index, "schema", "page-property", pageTypeSlug, "slug", `${slug}.jsonl`)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, line, "utf8")
  const flat = join(index, DECLARING_AT)
  mkdirSync(dirname(flat), { recursive: true })
  appendFileSync(flat, line, "utf8")
}

export function manifest(slug: string, fileName: string): Value {
  return { id: slug, pageTypeSlug: "named-file-property", slug, propertySlug: "manifest", fileName }
}

export const HELD_PAGE = "deep/a.held-type.ts"

export function claimingBeside(
  said: Record<string, unknown>,
  filed: FilePropertiesBy,
  there?: IsThere
): readonly string[] {
  const types: readonly Value[] = [
    { id: "1", pageTypeSlug: "page-type", slug: "held-type", properties: [said] },
  ]
  const value: Value = { id: A, pageTypeSlug: "held-type", slug: "a" }
  return claimsOf(value, `/repo/${HELD_PAGE}`, "/repo", filed, sidecarsIn(types), there)
}

export const SHARED_NAME: readonly Value[] = [
  { id: "1", pageTypeSlug: "file-property", slug: "notes", propertySlug: "notes" },
  { id: "2", pageTypeSlug: "text-property", slug: "location-notes", propertySlug: "notes" },
  {
    id: "3",
    pageTypeSlug: "page-type",
    slug: "review-session",
    properties: [{ pagePropertySlug: "notes" }],
  },
  {
    id: "4",
    pageTypeSlug: "page-type",
    slug: "location",
    properties: [{ pagePropertySlug: "location-notes" }],
  },
]

export const TWO_ABOVE: readonly Value[] = [
  { id: "1", pageTypeSlug: "file-property", slug: "alpha", propertySlug: "alpha" },
  { id: "2", pageTypeSlug: "file-property", slug: "beta", propertySlug: "beta" },
  { id: "3", pageTypeSlug: "page-type", slug: "one", properties: [{ pagePropertySlug: "alpha" }] },
  { id: "4", pageTypeSlug: "page-type", slug: "two", properties: [{ pagePropertySlug: "beta" }] },
  {
    id: "5",
    pageTypeSlug: "page-type",
    slug: "both",
    extendsSlug: ["page-type/one", "page-type/two"],
  },
]

export const NEARER: readonly Value[] = [
  manifest("near-manifest", "near.json"),
  manifest("far-manifest", "far.json"),
  {
    id: "a",
    pageTypeSlug: "page-type",
    slug: "far",
    properties: [{ pagePropertySlug: "named-file-property/far-manifest" }],
  },
  {
    id: "b",
    pageTypeSlug: "page-type",
    slug: "near",
    properties: [{ pagePropertySlug: "named-file-property/near-manifest" }],
  },
  { id: "c", pageTypeSlug: "page-type", slug: "mid", extendsSlug: ["page-type/far"] },
  {
    id: "d",
    pageTypeSlug: "page-type",
    slug: "leaf",
    extendsSlug: ["page-type/near", "page-type/mid"],
  },
]

export const EQUALLY_NEAR: readonly Value[] = [
  manifest("first-manifest", "first.json"),
  manifest("second-manifest", "second.json"),
  {
    id: "a",
    pageTypeSlug: "page-type",
    slug: "first-parent",
    properties: [{ pagePropertySlug: "named-file-property/first-manifest" }],
  },
  {
    id: "b",
    pageTypeSlug: "page-type",
    slug: "second-parent",
    properties: [{ pagePropertySlug: "named-file-property/second-manifest" }],
  },
  {
    id: "c",
    pageTypeSlug: "page-type",
    slug: "leaf",
    extendsSlug: ["page-type/first-parent", "page-type/second-parent"],
  },
]
