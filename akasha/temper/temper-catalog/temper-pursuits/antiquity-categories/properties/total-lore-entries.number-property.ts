import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TotalLoreEntries = number

export const totalLoreEntries = {
  id: "01a06166-503b-7003-ab8a-9dcbc88f6254",
  pageTypeSlug: "number-property",
  slug: "total-lore-entries",
  propertySlug: "total-lore-entries",
  definition: "how many lore entries an antiquity yields once it is dug up",
  max: null,
} as const satisfies NumberProperty
