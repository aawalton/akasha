import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningBolt = {
  id: "01a06572-95cf-7864-a35b-d7ce204fce69",
  type: "page-type/world-spell",
  slug: "lightning-bolt",
  title: "Lightning Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
