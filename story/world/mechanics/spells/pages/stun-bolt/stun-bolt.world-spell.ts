import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stunBolt = {
  id: "01a06572-95e4-7fd3-b51f-479df0a21593",
  type: "page-type/world-spell",
  slug: "stun-bolt",
  title: "Stun Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
