import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxManaSeals = {
  id: "01a0ea39-3370-742f-8abb-e87c4cfdee6d",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-mana-seals",
  title: "Mana Seals",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["mana seal", "sealed mana"],
  description: "A lock set on part of a body's mana so that it cannot be felt or used.",
} as const satisfies WorldMechanic
