import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveStrikingSpell = {
  id: "01a0e9f8-aa23-77c4-b676-0bdd1ea7ce0f",
  type: "page-type/world-spell",
  slug: "super-supportive-striking-spell",
  title: "Striking spell",
  world: "world/super-supportive",
  aliases: ["Slip, slip, slip"],
  description: "A sung spell that travels through walls to a known target and strikes it.",
  createdAt: "2026-09-28T21:43:02.947Z",
  updatedAt: "2026-09-28T21:43:06.000Z",
} as const satisfies WorldSpell
