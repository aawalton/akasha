import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const heatNull = {
  id: "01a06572-95c8-7d15-ad5f-ec1655d8eeb5",
  type: "page-type/world-spell",
  slug: "heat-null",
  title: "Heat Null",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
