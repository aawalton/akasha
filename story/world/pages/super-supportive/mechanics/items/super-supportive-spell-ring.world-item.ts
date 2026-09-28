import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSpellRing = {
  id: "01a0e9f4-be68-7d7f-b209-e98794f7a681",
  type: "page-type/world-item",
  slug: "super-supportive-spell-ring",
  title: "Spell ring",
  world: "world/super-supportive",
  aliases: ["wizard's ring"],
  description: "An enchanted ring that works one spell effect.",
} as const satisfies WorldItem
