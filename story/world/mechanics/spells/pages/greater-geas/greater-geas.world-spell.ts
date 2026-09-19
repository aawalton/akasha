import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterGeas = {
  id: "01a06572-95c7-7eb4-a0d8-b0f510e9f031",
  type: "page-type/world-spell",
  slug: "greater-geas",
  title: "Greater Geas",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
