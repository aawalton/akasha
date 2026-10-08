import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fivefoldArcaneBarrier = {
  id: "01a06572-95c3-7c25-b56b-82eeda069a6a",
  type: "page-type/world-spell",
  slug: "fivefold-arcane-barrier",
  title: "Fivefold Arcane Barrier",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
