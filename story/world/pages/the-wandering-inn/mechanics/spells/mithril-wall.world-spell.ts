import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mithrilWall = {
  id: "01a06572-95d9-7f1e-9faf-e05d711cee5b",
  type: "page-type/world-spell",
  slug: "mithril-wall",
  title: "Mithril Wall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
