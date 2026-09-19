import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const resurrection = {
  id: "01a06572-95dd-7380-b6f1-4c8a594a66bc",
  type: "page-type/world-spell",
  slug: "resurrection",
  title: "Resurrection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
