import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const cornucopia = {
  id: "01a06572-95bb-7c0f-a2ce-4e51a4559f29",
  type: "world-spell",
  slug: "cornucopia",
  title: "Cornucopia",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
