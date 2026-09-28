import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveStrikingSpell = {
  id: "01a0e9f8-aa23-77c4-b676-0bdd1ea7ce0f",
  type: "page-type/world-spell",
  slug: "super-supportive-striking-spell",
  title: "Striking spell",
  world: "world/super-supportive",
  aliases: ["Slip, slip, slip"],
  description: "A sung spell that travels through walls to a known target and strikes it.",
} as const satisfies WorldSpell
