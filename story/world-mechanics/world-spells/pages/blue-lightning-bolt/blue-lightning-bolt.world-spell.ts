import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const blueLightningBolt = {
  id: "01a06572-95b6-7e2c-b78a-e8d43cfad5bf",
  type: "world-spell",
  slug: "blue-lightning-bolt",
  title: "Blue Lightning Bolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
