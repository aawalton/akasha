import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const clearWeather = {
  id: "01a06572-95b9-7133-bc33-f386712f4dec",
  type: "world-spell",
  slug: "clear-weather",
  title: "Clear Weather",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
