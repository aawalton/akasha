import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const steelBarbDart = {
  id: "01a06572-95e2-70db-8af3-27a8a26acaba",
  type: "page-type/world-spell",
  slug: "steel-barb-dart",
  title: "Steel-Barb Dart",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
