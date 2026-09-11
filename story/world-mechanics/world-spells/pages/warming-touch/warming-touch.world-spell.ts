import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const warmingTouch = {
  id: "01a06572-95e9-7c6c-8e44-f195a4618c91",
  type: "world-spell",
  slug: "warming-touch",
  title: "Warming Touch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
