import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const snowFlume = {
  id: "01a06572-95e1-7d7b-b441-07099a3bcbdc",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "snow-flume",
  title: "Snow Flume",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
