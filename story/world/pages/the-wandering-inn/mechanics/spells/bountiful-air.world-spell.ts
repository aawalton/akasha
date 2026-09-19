import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bountifulAir = {
  id: "01a06572-95b7-776b-86af-434388e3b307",
  type: "page-type/world-spell",
  slug: "bountiful-air",
  title: "Bountiful Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
