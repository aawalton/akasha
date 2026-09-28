import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveLifeJacket = {
  id: "01a0e9f6-d518-77fb-8983-14b17bad6ac9",
  type: "page-type/world-spell",
  slug: "super-supportive-life-jacket",
  title: "Life Jacket",
  world: "world/super-supportive",
  aliases: ["life jacket spell", "Life Jacket spell impression"],
  description: "A spell impression that makes whoever or whatever it is cast on float.",
} as const satisfies WorldSpell
