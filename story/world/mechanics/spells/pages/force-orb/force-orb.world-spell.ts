import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forceOrb = {
  id: "01a06572-95c4-711f-b762-e6ec165dfd21",
  type: "page-type/world-spell",
  slug: "force-orb",
  title: "Force Orb",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
