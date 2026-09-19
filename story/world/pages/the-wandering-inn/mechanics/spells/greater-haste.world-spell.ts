import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterHaste = {
  id: "01a06572-95c7-7d29-9986-bd63fac8d23e",
  type: "page-type/world-spell",
  slug: "greater-haste",
  title: "Greater Haste",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
