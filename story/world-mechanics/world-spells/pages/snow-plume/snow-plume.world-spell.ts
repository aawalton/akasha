import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const snowPlume = {
  id: "01a06572-95e1-73bf-b98c-d1e70f8c8f33",
  type: "world-spell",
  slug: "snow-plume",
  title: "Snow Plume",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
