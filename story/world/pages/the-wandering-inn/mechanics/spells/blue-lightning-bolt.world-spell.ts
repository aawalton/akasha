import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blueLightningBolt = {
  id: "01a06572-95b6-7e2c-b78a-e8d43cfad5bf",
  type: "page-type/world-spell",
  slug: "blue-lightning-bolt",
  title: "Blue Lightning Bolt",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
