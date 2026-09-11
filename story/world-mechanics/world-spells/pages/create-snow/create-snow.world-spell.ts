import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const createSnow = {
  id: "01a06572-95bb-73e1-9b44-2a8c3b9ceee6",
  type: "world-spell",
  slug: "create-snow",
  title: "Create Snow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
