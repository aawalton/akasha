import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const depthExplosion = {
  id: "01a06572-95bc-7a62-8557-bd28bd43930c",
  type: "world-spell",
  slug: "depth-explosion",
  title: "Depth Explosion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
