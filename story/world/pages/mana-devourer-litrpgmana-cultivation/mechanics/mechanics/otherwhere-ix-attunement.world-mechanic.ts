import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxAttunement = {
  id: "01a0ea3c-757b-7c77-8236-d8ca2da9ec60",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-attunement",
  title: "Attunement",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["weapon attunement", "essence attunement"],
  description: "A bond of mana tying an object or creature to another.",
} as const satisfies WorldMechanic
