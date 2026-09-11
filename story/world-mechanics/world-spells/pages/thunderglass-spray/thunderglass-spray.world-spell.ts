import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const thunderglassSpray = {
  id: "01a06572-95e7-7174-ad7e-903ee43eb2d8",
  type: "world-spell",
  slug: "thunderglass-spray",
  title: "Thunderglass Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
