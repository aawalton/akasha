import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const antigravity = {
  id: "01a06572-95b4-74a6-b8ee-ea44584233aa",
  type: "world-spell",
  slug: "antigravity",
  title: "Antigravity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
