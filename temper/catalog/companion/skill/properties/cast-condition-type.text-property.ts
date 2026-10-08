import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const castConditionType = {
  id: "01a06193-6c9e-7d3f-8ec8-33900a372658",
  type: "page-type/text-property",
  slug: "cast-condition-type",
  propertySlug: "type",
  definition: "the kind of test before a companion casts",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T10:04:06.686Z",
  updatedAt: "2026-09-22T13:46:41.000Z",
} as const satisfies TextProperty
