import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mithrilWall = {
  id: "01a06572-95d9-7f1e-9faf-e05d711cee5b",
  type: "world-spell",
  slug: "mithril-wall",
  title: "Mithril Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
