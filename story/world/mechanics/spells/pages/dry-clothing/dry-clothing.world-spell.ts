import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dryClothing = {
  id: "01a06572-95be-7b22-9a71-d9e47c3cc24b",
  type: "page-type/world-spell",
  slug: "dry-clothing",
  title: "Dry Clothing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
