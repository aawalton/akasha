import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const drainMomentum = {
  id: "01a06572-95be-7930-8786-f4c6366f7ccc",
  type: "page-type/world-spell",
  slug: "drain-momentum",
  title: "Drain Momentum",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
