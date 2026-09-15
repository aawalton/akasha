import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const acidRain = {
  id: "01a06572-95b3-7c8f-ba9b-36f617550169",
  type: "world-spell",
  slug: "acid-rain",
  title: "Acid Rain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
