import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { fileName } from "akasha/page/file-property/properties/file-name.text-property.ts"
import { refreshedIn } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { type Shadow, shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  slugOf,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { pagePageType } from "akasha/page/properties/page-page-type.relation-property.ts"
import { pagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

export const FORMAT = "all-lower"

const AKASHA = "akasha"

const PAGE_AT = `${pageType.slug}/${page.slug}` as const

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

const PAGE_TYPE_AT = `${pageType.slug}/${pageType.slug}` as const

const PAGE_PROPERTY_ENTRY_AT = `${pageType.slug}/${pagePropertyEntry.slug}` as const

const TYPES: readonly Value[] = [
  {
    id: "01a0540d-0000-7000-8000-000000000001",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "page",
    extends: [],
    properties: [
      { pagePropertySlug: "id", required: true, many: false },
      { pagePropertySlug: "slug", required: true, many: false },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000002",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "module",
    extends: [PAGE_AT],
    properties: [{ pagePropertySlug: "test", required: false, many: false }],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000003",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "check",
    extends: [MODULE_AT],
    properties: [
      { pagePropertySlug: "test", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, maxCount: 2, maxLength: 3 },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000004",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "told",
    extends: [PAGE_AT],
    properties: [
      { pagePropertySlug: "directives", required: false, many: true, maxCount: null },
      { pagePropertySlug: "aids", required: false, many: true, maxCount: null },
      { pagePropertySlug: "tally", required: false, many: false },
      { pagePropertySlug: "lines", required: false, many: false },
      { pagePropertySlug: "rows", required: false, many: false },
      { pagePropertySlug: fileName.slug, required: false, many: false },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000005",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "looping",
    extends: ["page-type/looping"],
    properties: [{ pagePropertySlug: "id", required: false, many: false }],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000010",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "held",
    extends: [PAGE_AT],
    properties: [
      { pagePropertySlug: pagePageType.slug, required: true, many: false },
      { pagePropertySlug: "test", required: true, many: false },
    ],
  },
]

const SHAPES: readonly Value[] = [
  {
    id: "01a0540d-0000-7000-8000-000000000017",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "page-type",
    extends: [PAGE_AT],
    properties: [
      { pagePropertySlug: "extends-type", required: false, many: true, maxCount: null },
      { pagePropertySlug: pagePageType.slug, required: false, many: false },
      { pagePropertySlug: "properties", required: false, many: true, maxCount: null },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000022",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "page-property",
    extends: [PAGE_AT],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000018",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "boolean-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000006",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "text-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000007",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "record-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000008",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "number-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-00000000000f",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "relation-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000012",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "name-format",
    extends: [PAGE_AT],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000015",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "worded-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000013",
    type: `${pageType.slug}/name-format`,
    slug: FORMAT,
    code: "ts",
  },
  {
    id: "01a0540d-0000-7000-8000-000000000023",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "page-property-entry",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000024",
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "rowed-property",
    extends: [PAGE_PROPERTY_ENTRY_AT],
  },
]

const PROPERTIES: Record<string, Value> = {
  id: {
    id: "01a0540d-0000-7000-8000-000000000009",
    type: `${pageType.slug}/text-property`,
    slug: "id",
    propertySlug: "id",
    maxLength: 36,
    unique: "page",
  },
  slug: {
    id: "01a0540d-0000-7000-8000-00000000000a",
    type: `${pageType.slug}/text-property`,
    slug: "slug",
    propertySlug: "slug",
    maxLength: 8,
    nameFormat: FORMAT,
    unique: "page-type",
  },
  test: {
    id: "01a0540d-0000-7000-8000-00000000000b",
    type: `${pageType.slug}/text-property`,
    slug: "test",
    propertySlug: "test",
    maxLength: 4,
  },
  aids: {
    id: "01a0540d-0000-7000-8000-00000000000c",
    type: `${pageType.slug}/text-property`,
    slug: "aids",
    propertySlug: "aids",
    maxLength: 5,
  },
  name: {
    id: "01a0540d-0000-7000-8000-00000000000d",
    type: `${pageType.slug}/text-property`,
    slug: "name",
    propertySlug: "name",
    maxLength: 8,
    nameFormat: FORMAT,
  },
  tag: {
    id: "01a0540d-0000-7000-8000-000000000014",
    type: `${pageType.slug}/text-property`,
    slug: "tag",
    propertySlug: "tag",
    maxLength: 4,
  },
  [fileName.slug]: {
    id: "01a0540d-0000-7000-8000-000000000028",
    type: `${pageType.slug}/text-property`,
    slug: fileName.slug,
    propertySlug: fileName.propertySlug,
    maxLength: 100,
  },
  tally: {
    id: "01a0540d-0000-7000-8000-000000000016",
    type: "page-type/worded-property",
    slug: "tally",
    propertySlug: "tally",
    maxLength: 4,
  },
  "extends-type": {
    id: "01a0540d-0000-7000-8000-000000000019",
    type: `${pageType.slug}/relation-property`,
    slug: "extends-type",
    propertySlug: "extends",
    targetPageType: PAGE_TYPE_AT,
  },
  "page-property-slug": {
    id: "01a0540d-0000-7000-8000-00000000001a",
    type: `${pageType.slug}/relation-property`,
    slug: "page-property-slug",
    propertySlug: "page-property-slug",
  },
  required: {
    id: "01a0540d-0000-7000-8000-00000000001b",
    type: `${pageType.slug}/boolean-property`,
    slug: "required",
    propertySlug: "required",
  },
  many: {
    id: "01a0540d-0000-7000-8000-00000000001c",
    type: `${pageType.slug}/boolean-property`,
    slug: "many",
    propertySlug: "many",
  },
  "max-count": {
    id: "01a0540d-0000-7000-8000-00000000001d",
    type: `${pageType.slug}/number-property`,
    slug: "max-count",
    propertySlug: "maxCount",
    max: null,
  },
  "max-length": {
    id: "01a0540d-0000-7000-8000-00000000001e",
    type: `${pageType.slug}/number-property`,
    slug: "max-length",
    propertySlug: "maxLength",
    max: null,
  },
  properties: {
    id: "01a0540d-0000-7000-8000-00000000001f",
    type: `${pageType.slug}/record-property`,
    slug: "properties",
    propertySlug: "properties",
    properties: [
      { pagePropertySlug: "page-property-slug", required: true, many: false },
      { pagePropertySlug: "required", required: false, many: false },
      { pagePropertySlug: "many", required: false, many: false },
      { pagePropertySlug: "max-count", required: false, many: false },
      { pagePropertySlug: "max-length", required: false, many: false },
    ],
  },
  [pagePageType.slug]: {
    id: "01a0540d-0000-7000-8000-000000000027",
    type: `${pageType.slug}/relation-property`,
    slug: pagePageType.slug,
    propertySlug: pagePageType.propertySlug,
    targetPageType: PAGE_TYPE_AT,
  },
  lines: {
    id: "01a0540d-0000-7000-8000-000000000025",
    type: `${pageType.slug}/page-property-entry`,
    slug: "lines",
    propertySlug: "lines",
    properties: [{ pagePropertySlug: "name", required: true, many: false }],
  },
  rows: {
    id: "01a0540d-0000-7000-8000-000000000026",
    type: "page-type/rowed-property",
    slug: "rows",
    propertySlug: "rows",
    properties: [{ pagePropertySlug: "name", required: true, many: false }],
  },
  directives: {
    id: "01a0540d-0000-7000-8000-00000000000e",
    type: `${pageType.slug}/record-property`,
    slug: "directives",
    propertySlug: "directives",
    properties: [
      { pagePropertySlug: "name", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, maxCount: 3, maxLength: 4 },
      { pagePropertySlug: "text-property/tag", required: false, many: false },
      { pagePropertySlug: "record-property/properties", many: true, maxCount: null },
    ],
  },
}

const JUDGING =
  `export function ${exportedAs(FORMAT)}(name: string): boolean {\n` +
  "  return name === name.toLowerCase()\n" +
  "}\n"

export function seeded(root: string): Shadow {
  for (const one of [...TYPES, ...SHAPES, ...Object.values(PROPERTIES)]) {
    const slug = String(one["slug"])
    const at = `${AKASHA}/${slug}.${slugOf(String(one["type"]))}.ts`
    put(root, at, `export const ${exportedAs(slug)} = ${JSON.stringify(one)}\n`)
  }
  put(root, `${AKASHA}/${FORMAT}.name-format.code.ts`, JUDGING)
  refreshedIn(root, AKASHA)
  return shadowAt(root)
}
