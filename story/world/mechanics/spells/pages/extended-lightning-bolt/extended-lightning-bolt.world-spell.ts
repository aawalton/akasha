import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const extendedLightningBolt = {
  id: "01a06572-95bf-7542-8e9c-d51e5b20e498",
  type: "page-type/world-spell",
  slug: "extended-lightning-bolt",
  title: "Extended Lightning Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
