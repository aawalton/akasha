import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const farseeing = {
  id: "01a06572-95c0-7776-82b1-350f2d69017f",
  type: "world-spell",
  slug: "farseeing",
  title: "Farseeing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
