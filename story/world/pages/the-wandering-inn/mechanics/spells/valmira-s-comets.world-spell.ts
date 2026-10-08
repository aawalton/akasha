import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const valmiraSComets = {
  id: "01a06572-95e8-7867-aa14-c14bd862952d",
  type: "page-type/world-spell",
  slug: "valmira-s-comets",
  title: "Valmira’s Comets",
  world: "world/the-wandering-inn",
  appearanceCount: 14,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
