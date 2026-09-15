import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const acidResistance = {
  id: "01a06572-95b3-7890-9a0b-10ab74b6ebac",
  type: "world-spell",
  slug: "acid-resistance",
  title: "Acid Resistance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
