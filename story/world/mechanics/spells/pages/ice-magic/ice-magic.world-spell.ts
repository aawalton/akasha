import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceMagic = {
  id: "01a06572-95c9-7aba-ab5e-fa3beba271ba",
  type: "page-type/world-spell",
  slug: "ice-magic",
  title: "Ice Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
