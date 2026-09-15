import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const arrowOfWinter = {
  id: "01a06572-95b4-76a0-a7ff-9fdb6c56f62b",
  type: "world-spell",
  slug: "arrow-of-winter",
  title: "Arrow of Winter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
