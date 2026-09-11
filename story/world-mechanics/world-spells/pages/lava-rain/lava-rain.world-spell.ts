import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lavaRain = {
  id: "01a06572-95cc-7088-ae13-753e2723d097",
  type: "world-spell",
  slug: "lava-rain",
  title: "Lava Rain",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
