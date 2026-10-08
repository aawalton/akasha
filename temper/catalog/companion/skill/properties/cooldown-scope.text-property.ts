import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const cooldownScope = {
  id: "01a06193-6ca1-72e9-8534-eb54b1e77eca",
  type: "page-type/text-property",
  slug: "cooldown-scope",
  propertySlug: "scope",
  definition: "how widely a cooldown reduction reaches",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T10:04:06.689Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies TextProperty
