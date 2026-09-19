import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const reduceWeight = {
  id: "01a06572-95dc-7b69-bee3-7ae07dc51108",
  type: "page-type/world-spell",
  slug: "reduce-weight",
  title: "Reduce Weight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
