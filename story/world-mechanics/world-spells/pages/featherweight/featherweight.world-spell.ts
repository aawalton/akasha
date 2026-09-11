import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const featherweight = {
  id: "01a06572-95c0-7b28-92e8-898ff4bd9872",
  type: "world-spell",
  slug: "featherweight",
  title: "Featherweight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
