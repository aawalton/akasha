import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const snowFlume = {
  id: "01a06572-95e1-7d7b-b441-07099a3bcbdc",
  type: "page-type/world-spell",
  slug: "snow-flume",
  title: "Snow Flume",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
