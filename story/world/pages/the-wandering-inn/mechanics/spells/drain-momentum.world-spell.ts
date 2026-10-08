import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const drainMomentum = {
  id: "01a06572-95be-7930-8786-f4c6366f7ccc",
  type: "page-type/world-spell",
  slug: "drain-momentum",
  title: "Drain Momentum",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
