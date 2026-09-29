import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereXiGravitite = {
  id: "01a0ea88-77cf-7894-9188-372f25e4595f",
  type: "page-type/world-item",
  slug: "otherwhere-xi-gravitite",
  title: "Gravitite",
  world: "world/the-calamitous-bob-stubbed",
  description: "A quartz-like stone that pushes against gravity.",
  aliases: ["Manatite"],
} as const satisfies WorldItem
