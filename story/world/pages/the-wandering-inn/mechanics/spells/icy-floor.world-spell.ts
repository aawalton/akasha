import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const icyFloor = {
  id: "01a06572-95cb-7d8b-b3b3-a1cbedec53f0",
  type: "page-type/world-spell",
  slug: "icy-floor",
  title: "Icy Floor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
