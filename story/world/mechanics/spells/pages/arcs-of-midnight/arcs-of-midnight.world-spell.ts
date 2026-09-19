import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arcsOfMidnight = {
  id: "01a06572-95b4-739e-8253-7a7e8cf22611",
  type: "page-type/world-spell",
  slug: "arcs-of-midnight",
  title: "Arcs of Midnight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
