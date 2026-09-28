import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxManaCapacity = {
  id: "01a0ea36-0398-766a-8d4b-7fa31b1a47a5",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-mana-capacity",
  title: "Mana Capacity and Generation",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["mana capacity", "mana generation", "mana pool"],
  description: "How much mana a body holds, and how fast it makes more.",
} as const satisfies WorldMechanic
