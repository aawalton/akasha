import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mindScene = {
  id: "01a06572-95d9-7e89-a4a4-5c7f3b6f3d3c",
  type: "world-spell",
  slug: "mind-scene",
  title: "Mind Scene",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
