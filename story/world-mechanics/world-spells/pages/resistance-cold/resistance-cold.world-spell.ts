import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const resistanceCold = {
  id: "01a06572-95dd-7f2d-8005-fc3446e3e7e7",
  type: "world-spell",
  slug: "resistance-cold",
  title: "Resistance: Cold",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
