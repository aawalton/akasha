import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stinkingCloud = {
  id: "01a06572-95e3-79e6-8cb6-f580e4b29116",
  type: "world-spell",
  slug: "stinking-cloud",
  title: "Stinking Cloud",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
