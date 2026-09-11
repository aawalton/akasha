import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const commandAnimal = {
  id: "01a06572-95b9-7b59-9536-de976c186144",
  type: "world-spell",
  slug: "command-animal",
  title: "Command Animal",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
