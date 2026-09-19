import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flight = {
  id: "01a06572-95c4-75c0-b6c5-4c4d5d6e3988",
  type: "page-type/world-spell",
  slug: "flight",
  title: "Flight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
