import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const valmiraSComet = {
  id: "01a06572-95e8-7bc9-839d-7c0a4bd38a2c",
  type: "page-type/world-spell",
  slug: "valmira-s-comet",
  title: "Valmira’s Comet",
  world: "world/the-wandering-inn",
  appearanceCount: 22,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
