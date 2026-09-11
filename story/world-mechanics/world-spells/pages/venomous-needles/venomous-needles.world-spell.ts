import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const venomousNeedles = {
  id: "01a06572-95e8-7c72-8cf1-e5f66b9529d2",
  type: "world-spell",
  slug: "venomous-needles",
  title: "Venomous Needles",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
