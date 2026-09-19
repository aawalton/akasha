import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  idOf,
  indexedRepo,
  pageOf,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import {
  type Folded,
  foldedFor,
  type Naming,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import { pageProperty as pagePropertyPageType } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

type Held = Record<string, unknown>

export const AN_INSTANT = "2026-09-01T12:00:00.000Z"

export function carrying(key: string, declaredBy: string): Carried {
  return {
    pagePropertySlug: key,
    pageTypeSlug: "text-property",
    propertySlug: key,
    key,
    unique: null,
    declaredBy,
    required: false,
    many: false,
    maxCount: null,
    maxLength: null,
    uncommitted: false,
    secret: false,
  }
}

const seed = (one: string): string => `01a08800-0000-7000-8000-0000000000${one}`

export const HELD_THING_ID = seed("20")

export const HELD_CRATE_ID = seed("22")

export const DEVICE_TOKENS_AT = "akasha/person-system/device-token/device-token.page-type.ts"

const HELD_THING = "held-thing"

const HELD_FIGURE = "held-figure"

export const A_PORTRAIT_AT = "akasha/figure/pages/held-figure/held-figure.figure.portrait.md"

export const AT_THE_LENGTH: string = `held-${"a".repeat(95)}`

export const PAST_THE_LENGTH: string = `held-${"a".repeat(96)}`

export const A_NEW_THING = {
  pageTypeSlug: "thing",
  slug: "new-thing",
  values: { title: "one that is new", lastSeenAt: AN_INSTANT },
}

export const A_NEW_FIGURE = {
  pageTypeSlug: "figure",
  slug: "new-figure",
  values: { title: "one that is new" },
}

export const A_CRATE = {
  pageTypeSlug: "crate",
  slug: "held-crate",
  values: { title: "a crate" },
}

export const A_HELD_FIGURE = { pageTypeSlug: "figure", slug: HELD_FIGURE, merge: true }

export const A_HELD_THING = { pageTypeSlug: "thing", slug: HELD_THING }

const PAGE_AT = `${pageType.slug}/${page.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pagePropertyPageType.slug}` as const

const REPO_AT = rootOf(import.meta.dir)

export function pageTypeAt(slug: string): string {
  return `akasha/${listedAt(REPO_AT, "page-type", slug)[0]?.path ?? ""}`
}

function declares(pageProperty: string, rest: Held = {}): Held {
  return { pageProperty, required: false, many: false, ...rest }
}

function aProperty(one: string, slug: string, shape: string, rest: Held = {}): Held {
  return { id: seed(one), pageTypeSlug: shape, type: shape, slug, propertySlug: slug, ...rest }
}

function aType(one: string, slug: string, rest: Held): Held {
  return { id: seed(one), pageTypeSlug: "page-type", type: "page-type", slug, ...rest }
}

function under(folder: string, values: readonly Held[]): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const one of values) {
    found[`akasha/${folder}${String(one.slug)}.${String(one.pageTypeSlug)}.ts`] = pageOf(one)
  }
  return found
}

const HELD_THING_AT = "akasha/thing/pages/held-thing.thing.ts"

const THING_TYPES_AT = "akasha/thing/thing.page-type.types.ts"

export const HELD_THING_BODY = `import type { Thing } from "akasha/${THING_TYPES_AT}"

export const heldThing = {
  id: "${HELD_THING_ID}",
  slug: "held-thing",
  pageTypeSlug: "thing",
  type: "page-type/thing",
  title: "the name it already has",
  remark: "what was already noted",
  caption: "what it is shown as",
} as const satisfies Thing
`

export const ROOT: string = indexedRepo({
  ...under("", [
    aProperty("01", "page-type-slug", "text-property"),
    aProperty("02", "type", "text-property"),
    aProperty("03", "title", "text-property"),
    aProperty("04", "remark", "text-property"),
    aProperty("09", "caption", "text-property"),
    aProperty("05", "last-seen-at", "text-property"),
    aProperty("06", "portrait", "file-property"),
    aProperty("07", "manifest", "file-property", { fileName: "package.json" }),
    aProperty("08", "rounds", "page-property-entry"),
    aProperty("0a", "entries", "file-property"),
    aType("10", "page-property-entry", {
      extends: [PAGE_PROPERTY_AT],
      properties: [],
    }),
    {
      id: idOf("1"),
      pageTypeSlug: "page-type",
      type: "page-type",
      slug: "page",
      extends: [],
      properties: [declares("id"), declares("slug"), declares("entries", { uncommitted: true })],
    },
  ]),
  ...under("thing/", [
    aType("11", "thing", {
      extends: [PAGE_AT],
      types: "ts",
      properties: [
        declares("page-type-slug"),
        declares("type"),
        declares("title"),
        declares("remark"),
        declares("caption"),
        declares("last-seen-at", { uncommitted: true }),
      ],
    }),
  ]),
  ...under("crate/", [
    aType("12", "crate", {
      extends: ["page-type/thing"],
      types: "ts",
      properties: [declares("manifest")],
    }),
  ]),
  ...under("figure/", [
    aType("13", "figure", {
      extends: ["page-type/thing"],
      types: "ts",
      properties: [declares("portrait"), declares("rounds")],
    }),
  ]),
  ...under("shard/", [
    aType("14", "shard", {
      extends: ["page-type/thing"],
      types: "ts",
      properties: [],
    }),
  ]),
  ...under("shard/log-day/", [
    aType("15", "shard-log-day", {
      extends: ["page-type/thing"],
      types: "ts",
      properties: [],
    }),
  ]),
  ...under("crate/pages/", [
    {
      id: HELD_CRATE_ID,
      pageTypeSlug: "crate",
      type: "crate",
      slug: "held-crate",
      title: "a crate",
    },
  ]),
  ...under("figure/pages/held-figure/", [
    {
      id: seed("21"),
      pageTypeSlug: "figure",
      type: "figure",
      slug: "held-figure",
      title: "a figure",
      portrait: "md",
      rounds: "jsonl",
    },
  ]),
  [THING_TYPES_AT]: "export type Thing = Record<string, unknown>\n",
  [HELD_THING_AT]: HELD_THING_BODY,
})

export function composing(...named: readonly Naming[]): Folded {
  return foldedFor(ROOT, named)
}

export function bodyIn(said: Folded): string {
  return "puts" in said ? (said.puts[0]?.content ?? "") : ""
}

export function pathIn(said: Folded): string {
  return "puts" in said ? (said.puts[0]?.path ?? "") : ""
}

export function refusalIn(said: Folded): string {
  return "refused" in said ? said.refused : ""
}
