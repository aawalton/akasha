import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const coefficientType = {
  id: "01a06193-6ca4-7cdd-b848-4ff0537c6bf1",
  type: "page-type/text-property",
  slug: "coefficient-type",
  propertySlug: "coefficient-type",
  definition: "how often a coefficient counts against the metric it reads",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T10:04:06.692Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies TextProperty
