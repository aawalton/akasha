import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waveOfRadiance = {
  id: "01a06572-95e9-7603-890a-f1481dcf473b",
  type: "world-spell",
  slug: "wave-of-radiance",
  title: "Wave of Radiance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
