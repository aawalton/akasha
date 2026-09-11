import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const greaterIceElementals = {
  id: "01a06572-95c7-7850-9c8a-c42e7016fc3d",
  type: "world-spell",
  slug: "greater-ice-elementals",
  title: "Greater Ice Elementals",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
