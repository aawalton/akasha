import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const aegisOfSaimune = {
  id: "01a06572-95b3-71f4-8d20-48f114680817",
  type: "page-type/world-spell",
  slug: "aegis-of-saimune",
  title: "Aegis of Saimune",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
