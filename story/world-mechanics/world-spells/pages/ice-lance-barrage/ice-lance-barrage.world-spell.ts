import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceLanceBarrage = {
  id: "01a06572-95c9-7fbc-a469-41cb4cba925b",
  type: "world-spell",
  slug: "ice-lance-barrage",
  title: "Ice Lance Barrage",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
