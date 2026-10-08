import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterGeas = {
  id: "01a06572-95c7-7eb4-a0d8-b0f510e9f031",
  type: "page-type/world-spell",
  slug: "greater-geas",
  title: "Greater Geas",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.399Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
