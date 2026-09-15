import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const summonDarkFamiliars = {
  id: "01a06572-95e4-75c1-b6d3-e11b2f91a164",
  type: "world-spell",
  slug: "summon-dark-familiars",
  title: "Summon Dark Familiars",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
