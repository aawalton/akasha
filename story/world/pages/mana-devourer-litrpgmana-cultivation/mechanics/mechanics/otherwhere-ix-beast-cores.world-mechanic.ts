import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxBeastCores = {
  id: "01a0ea41-53e8-74b5-b067-bbdb73b2a4ea",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-beast-cores",
  title: "Beast Cores",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["mana cores", "monster cores", "devouring", "core absorption"],
  description: "The mana core inside a creature's chest, which can be taken after it dies.",
} as const satisfies WorldMechanic
