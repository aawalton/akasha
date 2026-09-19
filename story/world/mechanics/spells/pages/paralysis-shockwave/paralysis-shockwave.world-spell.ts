import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const paralysisShockwave = {
  id: "01a06572-95da-7d0a-9de5-6efad094c967",
  type: "page-type/world-spell",
  slug: "paralysis-shockwave",
  title: "PARALYSIS SHOCKWAVE",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
