import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stormKeep = {
  id: "01a06572-95e4-7030-9ed1-858749c410fd",
  type: "page-type/world-spell",
  slug: "storm-keep",
  title: "Storm Keep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
