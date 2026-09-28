import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSummoningSpell = {
  id: "01a0e9f8-aa23-74e4-a37f-71dec977552a",
  type: "page-type/world-spell",
  slug: "super-supportive-summoning-spell",
  title: "Summoning spell",
  world: "world/super-supportive",
  aliases: ["basic summoning spell"],
  description:
    "A basic spell that brings an object in line of sight to one waiting hand while the other holds the auriad.",
} as const satisfies WorldSpell
