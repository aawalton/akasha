import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterLightningBolt = {
  id: "01a06572-95c7-7bc6-a42c-d68e6dd2f4e4",
  type: "page-type/world-spell",
  slug: "greater-lightning-bolt",
  title: "Greater Lightning Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
