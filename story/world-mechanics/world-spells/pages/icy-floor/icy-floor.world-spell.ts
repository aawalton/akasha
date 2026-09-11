import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const icyFloor = {
  id: "01a06572-95cb-7d8b-b3b3-a1cbedec53f0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "icy-floor",
  title: "Icy Floor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
