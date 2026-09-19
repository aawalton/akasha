import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostWyvernSBreath = {
  id: "01a06572-95c5-7248-ae2e-ebbbe81ccbb7",
  type: "page-type/world-spell",
  slug: "frost-wyvern-s-breath",
  title: "Frost Wyvern’s Breath",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
