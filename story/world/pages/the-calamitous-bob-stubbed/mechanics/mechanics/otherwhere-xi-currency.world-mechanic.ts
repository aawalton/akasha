import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiCurrency = {
  id: "01a0ea85-ad41-7897-af8b-bd079eebc5dd",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-currency",
  title: "Currency",
  world: "world/the-calamitous-bob-stubbed",
  description: "The coins people pay with.",
} as const satisfies WorldMechanic
