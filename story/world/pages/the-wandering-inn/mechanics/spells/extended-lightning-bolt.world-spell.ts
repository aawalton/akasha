import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const extendedLightningBolt = {
  id: "01a06572-95bf-7542-8e9c-d51e5b20e498",
  type: "page-type/world-spell",
  slug: "extended-lightning-bolt",
  title: "Extended Lightning Bolt",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
