import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxManaAbsorption = {
  id: "01a0ea3a-9936-7138-9249-8038946c18ce",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-mana-absorption",
  title: "Mana Absorption",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["passive absorption", "absorbing elemental hits"],
  description: "Taking in part of the mana of magic that strikes or touches the body.",
} as const satisfies WorldMechanic
