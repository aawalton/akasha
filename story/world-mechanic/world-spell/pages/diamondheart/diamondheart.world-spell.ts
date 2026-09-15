import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const diamondheart = {
  id: "01a06572-95bd-7509-b860-770b62fac209",
  type: "page-type/world-spell",
  slug: "diamondheart",
  title: "Diamondheart",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
