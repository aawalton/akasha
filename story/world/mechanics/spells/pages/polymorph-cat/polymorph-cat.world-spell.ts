import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const polymorphCat = {
  id: "01a06572-95db-77d0-b673-d5a0f00ea6e9",
  type: "page-type/world-spell",
  slug: "polymorph-cat",
  title: "Polymorph: Cat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
