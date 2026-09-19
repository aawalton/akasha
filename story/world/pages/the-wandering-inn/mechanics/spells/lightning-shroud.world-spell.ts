import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningShroud = {
  id: "01a06572-95d0-72b8-94a3-6fb96dabf478",
  type: "page-type/world-spell",
  slug: "lightning-shroud",
  title: "Lightning Shroud",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
