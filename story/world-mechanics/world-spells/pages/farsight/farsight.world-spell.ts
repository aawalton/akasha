import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const farsight = {
  id: "01a06572-95c0-7b2e-a4d6-d4a2011675d9",
  type: "world-spell",
  slug: "farsight",
  title: "Farsight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
