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
} as const satisfies TextProperty
