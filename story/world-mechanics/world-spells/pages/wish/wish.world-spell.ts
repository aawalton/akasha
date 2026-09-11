import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wish = {
  id: "01a06572-95ea-7d9b-ba70-cf7ecdb89644",
  type: "world-spell",
  slug: "wish",
  title: "Wish",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
