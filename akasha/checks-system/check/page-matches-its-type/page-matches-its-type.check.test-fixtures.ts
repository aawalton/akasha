import type { Value } from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import type { Matching } from "../../../pages-system/name-format/name-matching/name-matching.module.code.ts"
import type { Reading } from "./page-matches-its-type.check.code.ts"

export const FORMAT = "all-lower"

const TYPES: Record<string, Value> = {
  page: {
    pageTypeSlug: "page-type",
    slug: "page",
    extendsSlug: null,
    properties: [
      { pagePropertySlug: "id", required: true, many: false },
      { pagePropertySlug: "slug", required: true, many: false },
    ],
  },
  module: {
    pageTypeSlug: "page-type",
    slug: "module",
    extendsSlug: "page-type/page",
    properties: [{ pagePropertySlug: "test", required: false, many: false }],
  },
  check: {
    pageTypeSlug: "page-type",
    slug: "check",
    extendsSlug: "page-type/module",
    properties: [
      { pagePropertySlug: "test", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, max: 2, total: 6 },
    ],
  },
  told: {
    pageTypeSlug: "page-type",
    slug: "told",
    extendsSlug: "page-type/page",
    properties: [
      { pagePropertySlug: "directives", required: false, many: true, max: null },
      { pagePropertySlug: "aids", required: false, many: true, max: null },
    ],
  },
  looping: {
    pageTypeSlug: "page-type",
    slug: "looping",
    extendsSlug: "page-type/looping",
    properties: [{ pagePropertySlug: "id", required: false, many: false }],
  },
}

const PROPERTIES: Record<string, Value> = {
  id: { pageTypeSlug: "text-property", slug: "id", max: 36 },
  slug: { pageTypeSlug: "text-property", slug: "slug", max: 8, nameFormatSlug: FORMAT },
  test: { pageTypeSlug: "text-property", slug: "test", max: 4 },
  aids: { pageTypeSlug: "text-property", slug: "aids", max: 5 },
  name: { pageTypeSlug: "text-property", slug: "name", max: 8, nameFormatSlug: FORMAT },
  directives: {
    pageTypeSlug: "record-property",
    slug: "directives",
    properties: [
      { pagePropertySlug: "name", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, max: 3, total: 6 },
    ],
  },
}

export const read: Reading = (pageTypeSlug, slug) =>
  pageTypeSlug === "page-type" ? (TYPES[slug] ?? null) : null

export const property = (slug: string): Value | null => PROPERTIES[slug] ?? null

export function allLower(name: string): boolean {
  return name === name.toLowerCase()
}

export function formatting(nameFormatSlug: string): Matching {
  if (nameFormatSlug !== FORMAT) {
    throw new Error(`no name format carries the slug \`${nameFormatSlug}\``)
  }
  return allLower
}

export const GENERATED_ID = "01a04f2b-3d23-7798-beae-c2174eaf237f"

export const THING_ID = "01a04f2b-3d23-7840-8508-269224959e52"

export const THING_AT = "akasha/one.thing.ts"

export const THING_BODY = 'export export const one = { pageTypeSlug: "thing", slug: "one" }\n'

export const UNIQUE_SLUG =
  '{"pageTypeSlug":"text-property","targetPageTypeSlug":null,"unique":"page-type",' +
  '"slug":"slug","propertySlug":"slug"}\n'

export const KIND_AT = "akasha/waiting.generator-kind.ts"
