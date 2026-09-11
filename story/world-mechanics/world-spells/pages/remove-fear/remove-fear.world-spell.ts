import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const removeFear = {
  id: "01a06572-95dc-7bc4-bf38-bd283efbe3ec",
  type: "world-spell",
  slug: "remove-fear",
  title: "Remove Fear",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
