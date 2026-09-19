import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spatialEarworm = {
  id: "01a06572-95e1-7830-b2e0-48aad73e5d33",
  type: "page-type/world-spell",
  slug: "spatial-earworm",
  title: "Spatial Earworm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
