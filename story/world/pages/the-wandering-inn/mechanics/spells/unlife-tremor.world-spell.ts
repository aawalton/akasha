import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const unlifeTremor = {
  id: "01a06572-95e7-75b8-8309-79420d8b13b4",
  type: "page-type/world-spell",
  slug: "unlife-tremor",
  title: "Unlife Tremor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
