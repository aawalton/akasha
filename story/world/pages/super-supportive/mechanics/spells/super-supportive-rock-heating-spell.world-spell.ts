import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveRockHeatingSpell = {
  id: "01a0e9f8-aa22-76f6-b0b7-0bf9abae806e",
  type: "page-type/world-spell",
  slug: "super-supportive-rock-heating-spell",
  title: "Rock-heating spell",
  world: "world/super-supportive",
  aliases: ["stone-heating spell"],
  description: "A spell that heats a stone hot enough to cook on.",
  createdAt: "2026-09-28T21:43:02.946Z",
  updatedAt: "2026-09-28T21:43:06.000Z",
} as const satisfies WorldSpell
