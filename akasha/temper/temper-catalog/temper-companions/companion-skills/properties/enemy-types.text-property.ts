import type { TextProperty } from "@akasha/pages-system/text-property"

export type EnemyTypes = string

export const enemyTypes = {
  id: "01a06193-6ca6-7e57-b847-abc05109ad79",
  pageTypeSlug: "text-property",
  slug: "enemy-types",
  propertySlug: "enemy-types",
  definition: "the sort of enemy a test holds for",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
