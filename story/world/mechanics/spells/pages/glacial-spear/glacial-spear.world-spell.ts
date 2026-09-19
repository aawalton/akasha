import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const glacialSpear = {
  id: "01a06572-95c6-765f-be2f-7bd2a643d8cc",
  type: "page-type/world-spell",
  slug: "glacial-spear",
  title: "Glacial Spear",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
