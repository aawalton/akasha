import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningBolt = {
  id: "01a06572-95cf-7864-a35b-d7ce204fce69",
  type: "page-type/world-spell",
  slug: "lightning-bolt",
  title: "Lightning Bolt",
  world: "world/the-wandering-inn",
  appearanceCount: 63,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.407Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
