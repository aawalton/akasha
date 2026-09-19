import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forceBeam = {
  id: "01a06572-95c4-7352-8acc-732e445c30f5",
  type: "page-type/world-spell",
  slug: "force-beam",
  title: "Force Beam",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
