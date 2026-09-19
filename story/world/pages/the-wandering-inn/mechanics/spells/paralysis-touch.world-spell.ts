import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const paralysisTouch = {
  id: "01a06572-95da-71bb-a4d6-64dcc371ddf6",
  type: "page-type/world-spell",
  slug: "paralysis-touch",
  title: "Paralysis Touch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
