import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVSpellcasting = {
  id: "01a0e9f2-d739-7a80-a12b-5e79ad1de335",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-spellcasting",
  title: "Spellcasting",
  world: "world/ends-of-magic",
  aliases: ["magery", "spell weaves", "spell constructs"],
  description: "The mage's craft of shaping mana into spells.",
} as const satisfies WorldMechanic
