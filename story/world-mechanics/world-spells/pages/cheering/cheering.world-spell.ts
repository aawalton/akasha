import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const cheering = {
  id: "01a06572-95b9-75a2-a0f5-1aa250e89993",
  type: "world-spell",
  slug: "cheering",
  title: "Cheering",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
