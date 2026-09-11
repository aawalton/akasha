import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const pillarOfFlames = {
  id: "01a06572-95da-732b-af9e-71ab42ae9d9a",
  type: "world-spell",
  slug: "pillar-of-flames",
  title: "Pillar of Flames",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
