import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const overgrowth = {
  id: "01a06572-95da-7303-b769-d2b7de1fc703",
  type: "page-type/world-spell",
  slug: "overgrowth",
  title: "Overgrowth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
