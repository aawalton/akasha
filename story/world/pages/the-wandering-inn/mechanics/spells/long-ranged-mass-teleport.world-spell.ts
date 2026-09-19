import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const longRangedMassTeleport = {
  id: "01a06572-95d0-7408-a460-58da4e1c814f",
  type: "page-type/world-spell",
  slug: "long-ranged-mass-teleport",
  title: "Long-Ranged Mass Teleport",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
