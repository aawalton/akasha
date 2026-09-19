import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterDispel = {
  id: "01a06572-95c7-7473-87f2-970637ef0ff2",
  type: "page-type/world-spell",
  slug: "greater-dispel",
  title: "Greater Dispel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
