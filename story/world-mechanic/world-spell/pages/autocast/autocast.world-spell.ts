import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const autocast = {
  id: "01a06572-95b5-7593-ac6b-93cbb70d8780",
  type: "page-type/world-spell",
  slug: "autocast",
  title: "Autocast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
