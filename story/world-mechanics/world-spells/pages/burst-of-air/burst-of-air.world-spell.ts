import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const burstOfAir = {
  id: "01a06572-95b8-72ef-8c50-3beece1b3e57",
  type: "world-spell",
  slug: "burst-of-air",
  title: "Burst of Air",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
