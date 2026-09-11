import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const longRangedMassTeleport = {
  id: "01a06572-95d0-7408-a460-58da4e1c814f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "long-ranged-mass-teleport",
  title: "Long-Ranged Mass Teleport",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
