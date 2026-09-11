import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const calmEmotions = {
  id: "01a06572-95b8-7a81-9934-c9cd85372b30",
  type: "world-spell",
  slug: "calm-emotions",
  title: "Calm Emotions",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
