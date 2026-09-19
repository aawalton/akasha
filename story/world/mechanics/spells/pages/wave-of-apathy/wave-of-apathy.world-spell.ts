import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waveOfApathy = {
  id: "01a06572-95e9-7f52-8cf8-fc00f5a460be",
  type: "page-type/world-spell",
  slug: "wave-of-apathy",
  title: "Wave of Apathy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
