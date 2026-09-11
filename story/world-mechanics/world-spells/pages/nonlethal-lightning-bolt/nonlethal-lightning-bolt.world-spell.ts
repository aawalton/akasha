import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const nonlethalLightningBolt = {
  id: "01a06572-95d9-7131-b198-4166dbe40228",
  type: "world-spell",
  slug: "nonlethal-lightning-bolt",
  title: "Nonlethal Lightning Bolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
