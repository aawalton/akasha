import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxManaTransfer = {
  id: "01a0ea39-3370-709b-81e8-8367159a4f3e",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-mana-transfer",
  title: "Mana Transfer",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["mana draining", "feeding mana"],
  description: "Passing mana from one being or vessel into another.",
} as const satisfies WorldMechanic
