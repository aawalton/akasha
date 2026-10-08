import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonManaFamiliar = {
  id: "01a06572-95e4-7239-a4ae-87510e1a1b9d",
  type: "page-type/world-spell",
  slug: "summon-mana-familiar",
  title: "Summon Mana Familiar",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
