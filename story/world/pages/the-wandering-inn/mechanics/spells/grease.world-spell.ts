import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const grease = {
  id: "01a06572-95c6-73f5-8de3-ecf4903e4390",
  type: "page-type/world-spell",
  slug: "grease",
  title: "Grease",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
