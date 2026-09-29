import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiElementalAscension = {
  id: "01a0ea8b-ae82-775d-abf9-b808ef1f31d3",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-elemental-ascension",
  title: "Elemental Ascension",
  world: "world/the-calamitous-bob-stubbed",
  description: "The change of a caster into a being partly made of their own hue of mana.",
  aliases: ["Becoming elemental", "Elemental archmage"],
} as const satisfies WorldMechanic
