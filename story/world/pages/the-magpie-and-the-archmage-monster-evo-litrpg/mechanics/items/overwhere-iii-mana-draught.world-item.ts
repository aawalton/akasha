import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIiiManaDraught = {
  id: "01a0f36a-1b96-75ea-97fa-8a67fab105bc",
  type: "page-type/world-item",
  slug: "overwhere-iii-mana-draught",
  title: "Mana Draught",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "A small blue glass vial of thin, faintly glowing liquor that gives back about 10 mana within a few minutes.",
} as const satisfies WorldItem
