import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const enemyTypes = {
  id: "01a06193-6ca6-7e57-b847-abc05109ad79",
  type: "page-type/text-property",
  slug: "enemy-types",
  propertySlug: "enemy-types",
  definition: "the sort of enemy a test covers",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T10:04:06.694Z",
  updatedAt: "2026-09-22T13:57:49.000Z",
} as const satisfies TextProperty
