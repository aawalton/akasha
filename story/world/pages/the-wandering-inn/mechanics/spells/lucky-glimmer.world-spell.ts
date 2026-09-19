import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const luckyGlimmer = {
  id: "01a06572-95d0-7763-8006-abf1d2c6f0d6",
  type: "page-type/world-spell",
  slug: "lucky-glimmer",
  title: "Lucky Glimmer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
