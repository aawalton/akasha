import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const conditionKind = {
  id: "01a06193-6c9f-770c-8d91-5ed8daef932d",
  type: "page-type/text-property",
  slug: "condition-kind",
  propertySlug: "type",
  definition: "what a test inside an effect reads",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T10:04:06.687Z",
  updatedAt: "2026-09-22T10:13:14.000Z",
} as const satisfies TextProperty
