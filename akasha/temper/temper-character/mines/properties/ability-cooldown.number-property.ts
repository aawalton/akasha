import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AbilityCooldown = number

export const abilityCooldown = {
  id: "01a05fcd-f54b-793a-81d3-a56e18375ccf",
  pageTypeSlug: "number-property",
  slug: "ability-cooldown",
  propertySlug: "ability-cooldown",
  definition: "how many seconds an item's ability waits between uses",
  max: null,
} as const satisfies NumberProperty
