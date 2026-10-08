import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningTempest = {
  id: "01a06572-95d0-79e2-a426-633358bb9e04",
  type: "page-type/world-spell",
  slug: "lightning-tempest",
  title: "Lightning Tempest",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.408Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
