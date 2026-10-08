import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const targetKind = {
  id: "01a06193-6c9e-705c-af85-3dc816a00a9a",
  type: "page-type/text-property",
  slug: "target-kind",
  propertySlug: "type",
  definition: "an effect's target",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T10:04:06.686Z",
  updatedAt: "2026-09-22T13:53:27.000Z",
} as const satisfies TextProperty
