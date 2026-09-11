import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { refreshedIn } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { type Shadow, shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"

export const FORMAT = "all-lower"

const AKASHA = "akasha"

const TYPES: readonly Value[] = [
  {
    id: "01a0540d-0000-7000-8000-000000000001",
    pageTypeSlug: "page-type",
    slug: "page",
    extends: [],
    properties: [
      { pagePropertySlug: "id", required: true, many: false },
      { pagePropertySlug: "slug", required: true, many: false },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000002",
    pageTypeSlug: "page-type",
    slug: "module",
    extends: ["page-type/page"],
    properties: [{ pagePropertySlug: "test", required: false, many: false }],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000003",
    pageTypeSlug: "page-type",
    slug: "check",
    extends: ["page-type/module"],
    properties: [
      { pagePropertySlug: "test", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, maxCount: 2, maxLength: 3 },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000004",
    pageTypeSlug: "page-type",
    slug: "told",
    extends: ["page-type/page"],
    properties: [
      { pagePropertySlug: "directives", required: false, many: true, maxCount: null },
      { pagePropertySlug: "aids", required: false, many: true, maxCount: null },
      { pagePropertySlug: "tally", required: false, many: false },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000005",
    pageTypeSlug: "page-type",
    slug: "looping",
    extends: ["page-type/looping"],
    properties: [{ pagePropertySlug: "id", required: false, many: false }],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000010",
    pageTypeSlug: "page-type",
    slug: "held",
    extends: ["page-type/page"],
    properties: [
      { pagePropertySlug: "page-type-slug", required: true, many: false },
      { pagePropertySlug: "test", required: true, many: false },
    ],
  },
]

const SHAPES: readonly Value[] = [
  {
    id: "01a0540d-0000-7000-8000-000000000017",
    pageTypeSlug: "page-type",
    slug: "page-type",
    extends: ["page-type/page"],
    properties: [
      { pagePropertySlug: "extends-type", required: false, many: true, maxCount: null },
      { pagePropertySlug: "page-type-slug", required: false, many: false },
      { pagePropertySlug: "properties", required: false, many: true, maxCount: null },
    ],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000022",
    pageTypeSlug: "page-type",
    slug: "page-property",
    extends: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000018",
    pageTypeSlug: "page-type",
    slug: "boolean-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000006",
    pageTypeSlug: "page-type",
    slug: "text-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000007",
    pageTypeSlug: "page-type",
    slug: "record-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000008",
    pageTypeSlug: "page-type",
    slug: "number-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-00000000000f",
    pageTypeSlug: "page-type",
    slug: "relation-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000012",
    pageTypeSlug: "page-type",
    slug: "name-format",
    extends: ["page-type/page"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000015",
    pageTypeSlug: "page-type",
    slug: "worded-property",
    extends: ["page-property"],
  },
  {
    id: "01a0540d-0000-7000-8000-000000000013",
    pageTypeSlug: "name-format",
    slug: FORMAT,
    code: "ts",
  },
]

const PROPERTIES: Record<string, Value> = {
  id: {
    id: "01a0540d-0000-7000-8000-000000000009",
    pageTypeSlug: "text-property",
    slug: "id",
    propertySlug: "id",
    maxLength: 36,
    unique: "page",
  },
  slug: {
    id: "01a0540d-0000-7000-8000-00000000000a",
    pageTypeSlug: "text-property",
    slug: "slug",
    propertySlug: "slug",
    maxLength: 8,
    nameFormat: FORMAT,
    unique: "page-type",
  },
  test: {
    id: "01a0540d-0000-7000-8000-00000000000b",
    pageTypeSlug: "text-property",
    slug: "test",
    propertySlug: "test",
    maxLength: 4,
  },
  aids: {
    id: "01a0540d-0000-7000-8000-00000000000c",
    pageTypeSlug: "text-property",
    slug: "aids",
    propertySlug: "aids",
    maxLength: 5,
  },
  name: {
    id: "01a0540d-0000-7000-8000-00000000000d",
    pageTypeSlug: "text-property",
    slug: "name",
    propertySlug: "name",
    maxLength: 8,
    nameFormat: FORMAT,
  },
  tag: {
    id: "01a0540d-0000-7000-8000-000000000014",
    pageTypeSlug: "text-property",
    slug: "tag",
    propertySlug: "tag",
    maxLength: 4,
  },
  tally: {
    id: "01a0540d-0000-7000-8000-000000000016",
    pageTypeSlug: "worded-property",
    slug: "tally",
    propertySlug: "tally",
    maxLength: 4,
  },
  "extends-type": {
    id: "01a0540d-0000-7000-8000-000000000019",
    pageTypeSlug: "relation-property",
    slug: "extends-type",
    propertySlug: "extends",
  },
  "page-property-slug": {
    id: "01a0540d-0000-7000-8000-00000000001a",
    pageTypeSlug: "relation-property",
    slug: "page-property-slug",
    propertySlug: "page-property-slug",
  },
  required: {
    id: "01a0540d-0000-7000-8000-00000000001b",
    pageTypeSlug: "boolean-property",
    slug: "required",
    propertySlug: "required",
  },
  many: {
    id: "01a0540d-0000-7000-8000-00000000001c",
    pageTypeSlug: "boolean-property",
    slug: "many",
    propertySlug: "many",
  },
  "max-count": {
    id: "01a0540d-0000-7000-8000-00000000001d",
    pageTypeSlug: "number-property",
    slug: "max-count",
    propertySlug: "maxCount",
    max: null,
  },
  "max-length": {
    id: "01a0540d-0000-7000-8000-00000000001e",
    pageTypeSlug: "number-property",
    slug: "max-length",
    propertySlug: "maxLength",
    max: null,
  },
  properties: {
    id: "01a0540d-0000-7000-8000-00000000001f",
    pageTypeSlug: "record-property",
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
  "page-type-slug": {
    id: "01a0540d-0000-7000-8000-000000000011",
    pageTypeSlug: "relation-property",
    slug: "page-type-slug",
    propertySlug: "page-type-slug",
  },
  directives: {
    id: "01a0540d-0000-7000-8000-00000000000e",
    pageTypeSlug: "record-property",
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
    const at = `${AKASHA}/${slug}.${String(one["pageTypeSlug"])}.ts`
    put(root, at, `export const ${exportedAs(slug)} = ${JSON.stringify(one)}\n`)
  }
  put(root, `${AKASHA}/${FORMAT}.name-format.code.ts`, JUDGING)
  refreshedIn(root, AKASHA)
  return shadowAt(root)
}
