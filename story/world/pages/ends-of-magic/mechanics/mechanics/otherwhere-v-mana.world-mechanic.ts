import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVMana = {
  id: "01a0e9f1-9e7c-76a5-9ea4-b57cfe527aad",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-mana",
  title: "Mana",
  world: "world/ends-of-magic",
  aliases: ["mana types", "mana pool"],
  description: "The magical energy mages shape into spells, found in many kinds.",
} as const satisfies WorldMechanic
