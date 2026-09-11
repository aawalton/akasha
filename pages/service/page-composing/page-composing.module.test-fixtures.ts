import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  idOf,
  indexedRepo,
  pageOf,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Carried } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"

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

export const DEVICE_TOKENS_AT = "akasha/person-system/device-tokens/device-token.page-type.ts"

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

const HELD_THING_AT = "akasha/things/pages/held-thing.thing.ts"

const THING_TYPES_AT = "akasha/things/thing.page-type.types.ts"

export const HELD_THING_BODY = `import type { Thing } from "akasha/${THING_TYPES_AT}"

export const heldThing = {
  id: "${HELD_THING_ID}",
  slug: "held-thing",
  pageTypeSlug: "thing",
  type: "thing",
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
      pluralSlug: "page-property-entries",
      extends: ["page-type/page-property"],
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
  ...under("things/", [
    aType("11", "thing", {
      pluralSlug: "things",
      extends: ["page-type/page"],
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
  ...under("crates/", [
    aType("12", "crate", {
      pluralSlug: "crates",
      extends: ["page-type/thing"],
      types: "ts",
      properties: [declares("manifest")],
    }),
  ]),
  ...under("figures/", [
    aType("13", "figure", {
      pluralSlug: "figures",
      extends: ["page-type/thing"],
      types: "ts",
      properties: [declares("portrait"), declares("rounds")],
    }),
  ]),
  ...under("crates/pages/", [
    {
      id: HELD_CRATE_ID,
      pageTypeSlug: "crate",
      type: "crate",
      slug: "held-crate",
      title: "a crate",
    },
  ]),
  ...under("figures/pages/held-figure/", [
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
