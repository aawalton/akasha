import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const summonObject = {
  id: "01a06572-95e4-7e7c-a0a9-450a7d70d6ce",
  type: "world-spell",
  slug: "summon-object",
  title: "Summon Object",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
