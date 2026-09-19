import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const farsight = {
  id: "01a06572-95c0-7b2e-a4d6-d4a2011675d9",
  type: "page-type/world-spell",
  slug: "farsight",
  title: "Farsight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
