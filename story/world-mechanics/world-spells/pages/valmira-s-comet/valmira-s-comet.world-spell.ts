import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const valmiraSComet = {
  id: "01a06572-95e8-7bc9-839d-7c0a4bd38a2c",
  type: "world-spell",
  slug: "valmira-s-comet",
  title: "Valmira’s Comet",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
