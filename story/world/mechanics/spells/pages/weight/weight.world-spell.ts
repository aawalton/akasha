import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const weight = {
  id: "01a06572-95ea-72ac-b954-d623d8c89da0",
  type: "page-type/world-spell",
  slug: "weight",
  title: "Weight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
