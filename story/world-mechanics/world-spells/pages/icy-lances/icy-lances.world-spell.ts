import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const icyLances = {
  id: "01a06572-95cb-74c8-bd26-7d983e07df1a",
  type: "world-spell",
  slug: "icy-lances",
  title: "Icy Lances",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
