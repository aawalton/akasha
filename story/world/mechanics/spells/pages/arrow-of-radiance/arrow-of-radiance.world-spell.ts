import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arrowOfRadiance = {
  id: "01a06572-95b4-7ad0-8602-e486f7e8c48c",
  type: "page-type/world-spell",
  slug: "arrow-of-radiance",
  title: "Arrow of Radiance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
