import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const repaired = {
  id: "01a06572-95dd-7fed-87cc-415e8f4d5fd2",
  type: "world-spell",
  slug: "repaired",
  title: "Repaired",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
