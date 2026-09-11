import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const eraseMemory = {
  id: "01a06572-95bf-7392-a446-334b202f5e2e",
  type: "world-spell",
  slug: "erase-memory",
  title: "Erase Memory",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
