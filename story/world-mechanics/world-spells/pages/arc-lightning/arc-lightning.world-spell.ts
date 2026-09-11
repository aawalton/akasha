import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const arcLightning = {
  id: "01a06572-95b4-7fb3-87e0-57555f843183",
  type: "world-spell",
  slug: "arc-lightning",
  title: "Arc Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
