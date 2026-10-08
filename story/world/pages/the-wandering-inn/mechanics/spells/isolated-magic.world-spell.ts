import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const isolatedMagic = {
  id: "01a06572-95cc-708e-8bf7-bc04a4f92e99",
  type: "page-type/world-spell",
  slug: "isolated-magic",
  title: "Isolated Magic",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
