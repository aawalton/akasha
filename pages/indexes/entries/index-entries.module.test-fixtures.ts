import { appendFileSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type {
  FilePropertiesBy,
  UncommittedBy,
} from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { lineFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import {
  claimsOf,
  type IsThere,
  sidecarsIn,
} from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"
import type { Shaped } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import { shapeFiled } from "akasha/pages/indexes/shapes/index-shapes.index.code.ts"
import { id as idPage } from "akasha/pages/properties/id.text-property.ts"
import { slug as slugPage } from "akasha/pages/properties/slug.text-property.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const A = "01a04b79-0000-7000-8000-00000000000a"
export const B = "01a04b79-0000-7000-8000-00000000000b"
export const C = "01a04b79-0000-7000-8000-00000000000c"
export const D = "01a04b79-0000-7000-8000-00000000000d"

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

export type Kept = Map<string, string[]>

export function propertyKind(kept: Kept, pageTypeSlug: string): undefined {
  const typed = JSON.stringify({
    path: `${pageTypeSlug}.${PAGE_TYPE}.ts`,
    value: { pageTypeSlug: PAGE_TYPE, slug: pageTypeSlug, extends: [PAGE_PROPERTY] },
  })
  const held = kept.get(PAGE_TYPE) ?? []
  if (!held.includes(typed)) kept.set(PAGE_TYPE, [...held, typed])
}

export function shaping(
  kept: Kept,
  pageTypeSlug: string,
  slug: string,
  said: Record<string, unknown> = {}
): undefined {
  const value = { pageTypeSlug, slug, ...said }
  const line = JSON.stringify({ path: `${slug}.${pageTypeSlug}.ts`, value })
  kept.set(pageTypeSlug, [...(kept.get(pageTypeSlug) ?? []), line])
  propertyKind(kept, pageTypeSlug)
}

function shapesKept(kept: Kept): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const lines of kept.values()) {
    for (const line of lines) {
      const said = JSON.parse(line) as { readonly value: Value }
      for (const one of shapeFiled(said.value)) {
        found.set(one.at, [...(found.get(one.at) ?? []), one.line])
      }
    }
  }
  return found
}

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
    lineFiled(root, at, line)
  }
  page("domain.page-type.ts", {
    id: "1",
    pageTypeSlug: "page-type",
    slug: "domain",
    extends: ["page"],
  })
  page("module.page-type.ts", {
    id: "2",
    pageTypeSlug: "page-type",
    slug: "module",
    extends: ["domain"],
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
    members: ["relation-property/page-domain", "relation-property/note-slug"],
  })
  filed(
    "identity/page-type/record-property/slug/parts.jsonl",
    '{"path":"parts.record-property.ts","id":"3"}'
  )
  filed(
    "identity/page-type/one-of-property/slug/either.jsonl",
    '{"path":"either.one-of-property.ts","id":"4"}'
  )
  shaping(kept, "file-property", "code", { propertySlug: "code" })
  shaping(kept, "relation-property", "page-domain", {
    propertySlug: "domain",
    targetPageType: "domain",
  })
  shaping(kept, "relation-property", "part-slugs", {
    propertySlug: "part-slugs",
    targetPageType: "domain",
  })
  shaping(kept, "relation-property", "note-slug", {
    propertySlug: "note-slug",
    targetPageType: "note",
  })
  shaping(kept, idPage.type, idPage.slug, {
    propertySlug: idPage.propertySlug,
    unique: idPage.unique,
  })
  shaping(kept, slugPage.type, slugPage.slug, {
    propertySlug: slugPage.propertySlug,
    unique: slugPage.unique,
  })
  propertyKind(kept, "one-of-property")
  for (const [type, lines] of kept) filed(`value/${type}.jsonl`, lines.join("\n"))
  for (const [at, lines] of shapesKept(kept)) filed(at, lines.join("\n"))
  return { root, repo }
}

const TARGETS: Readonly<Record<string, string | readonly string[]>> = {
  "part-slugs": "domain",
  "noted-slugs": "domain",
  "either-slug": ["domain", "note"],
  "gone-slugs": "note",
  "page-type-slug": "page-type",
  "case-page": "domain",
}

const ROW_FIELDS: Readonly<Record<string, readonly string[]>> = { cases: ["case-page"] }

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
  casePage: "case-page",
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
    rowFieldOfKey: (slug, key) => {
      const said = KEYED[key] ?? null
      const fields = ROW_FIELDS[slug] ?? []
      return said !== null && fields.includes(said) ? said : null
    },
    entriedIn: () => [],
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
  const kept: Kept = new Map()
  shaping(kept, pageTypeSlug, slug, said)
  for (const [type, lines] of kept) {
    const at = join(index, `value/${type}.jsonl`)
    mkdirSync(dirname(at), { recursive: true })
    appendFileSync(at, `${lines.join("\n")}\n`, "utf8")
  }
  for (const [where, held] of shapesKept(kept)) {
    const to = join(index, where)
    mkdirSync(dirname(to), { recursive: true })
    appendFileSync(to, `${held.join("\n")}\n`, "utf8")
  }
}

function manifest(slug: string, fileName: string): Value {
  return { id: slug, pageTypeSlug: "file-property", slug, propertySlug: "manifest", fileName }
}

export const HELD_PAGE = "deep/a.held-type.ts"

const NOTHING_WITHHELD: UncommittedBy = new Map()

export function claimingBeside(
  said: Record<string, unknown>,
  filed: FilePropertiesBy,
  there?: IsThere,
  withheld: UncommittedBy = NOTHING_WITHHELD
): readonly string[] {
  const types: readonly Value[] = [
    { id: "1", pageTypeSlug: "page-type", slug: "held-type", properties: [said] },
  ]
  const value: Value = { id: A, pageTypeSlug: "held-type", slug: "a" }
  return claimsOf(value, `/repo/${HELD_PAGE}`, "/repo", filed, sidecarsIn(types), withheld, there)
}

export function withholding(propertySlug: string): UncommittedBy {
  return new Map([["held-type", new Set([propertySlug])]])
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
    extends: ["page-type/one", "page-type/two"],
  },
]

export const NEARER: readonly Value[] = [
  manifest("near-manifest", "near.json"),
  manifest("far-manifest", "far.json"),
  {
    id: "a",
    pageTypeSlug: "page-type",
    slug: "far",
    properties: [{ pagePropertySlug: "file-property/far-manifest" }],
  },
  {
    id: "b",
    pageTypeSlug: "page-type",
    slug: "near",
    properties: [{ pagePropertySlug: "file-property/near-manifest" }],
  },
  { id: "c", pageTypeSlug: "page-type", slug: "mid", extends: ["page-type/far"] },
  {
    id: "d",
    pageTypeSlug: "page-type",
    slug: "leaf",
    extends: ["page-type/near", "page-type/mid"],
  },
]

export const EQUALLY_NEAR: readonly Value[] = [
  manifest("first-manifest", "first.json"),
  manifest("second-manifest", "second.json"),
  {
    id: "a",
    pageTypeSlug: "page-type",
    slug: "first-parent",
    properties: [{ pagePropertySlug: "file-property/first-manifest" }],
  },
  {
    id: "b",
    pageTypeSlug: "page-type",
    slug: "second-parent",
    properties: [{ pagePropertySlug: "file-property/second-manifest" }],
  },
  {
    id: "c",
    pageTypeSlug: "page-type",
    slug: "leaf",
    extends: ["page-type/first-parent", "page-type/second-parent"],
  },
]
