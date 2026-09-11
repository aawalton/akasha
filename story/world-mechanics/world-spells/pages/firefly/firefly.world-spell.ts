import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const firefly = {
  id: "01a06572-95c2-7ee8-baf2-92618d31c5e4",
  type: "world-spell",
  slug: "firefly",
  title: "Firefly",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
