import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const slipperyFloor = {
  id: "01a06572-95e1-7ea4-af52-6d5d11bd0b79",
  type: "page-type/world-spell",
  slug: "slippery-floor",
  title: "Slippery Floor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
