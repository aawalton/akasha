import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const teleportationAnchor = {
  id: "01a06572-95e6-7566-80f0-1e55664617e0",
  type: "page-type/world-spell",
  slug: "teleportation-anchor",
  title: "Teleportation Anchor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
