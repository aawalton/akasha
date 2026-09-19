import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireblast = {
  id: "01a06572-95c2-7c1e-83d2-d5551c68386a",
  type: "page-type/world-spell",
  slug: "fireblast",
  title: "Fireblast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
