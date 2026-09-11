import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightwall = {
  id: "01a06572-95d0-78e0-9c15-a06e6d2cccc0",
  type: "world-spell",
  slug: "lightwall",
  title: "Lightwall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
