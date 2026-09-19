import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blueLightningBolt = {
  id: "01a06572-95b6-7e2c-b78a-e8d43cfad5bf",
  type: "page-type/world-spell",
  slug: "blue-lightning-bolt",
  title: "Blue Lightning Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
