import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const featherhop = {
  id: "01a06572-95c0-7e14-8857-9a789eb08aa2",
  type: "page-type/world-spell",
  slug: "featherhop",
  title: "Featherhop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
