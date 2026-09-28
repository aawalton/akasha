import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVSpellTiers = {
  id: "01a0e9f3-1a10-7b12-9cc2-eb30939b9dec",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-spell-tiers",
  title: "Spell Tiers",
  world: "world/ends-of-magic",
  aliases: ["tiers of magic", "realms of magic"],
  description: "The ranking of spells and magic from low to high by power.",
} as const satisfies WorldMechanic
