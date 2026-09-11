import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const saltSPurification = {
  id: "01a06572-95de-728d-b1af-b86926c57560",
  type: "world-spell",
  slug: "salt-s-purification",
  title: "Salt’s Purification",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
