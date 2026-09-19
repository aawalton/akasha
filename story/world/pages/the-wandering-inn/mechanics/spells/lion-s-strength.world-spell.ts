import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lionSStrength = {
  id: "01a06572-95d0-7472-bff7-02eb5926ee5f",
  type: "page-type/world-spell",
  slug: "lion-s-strength",
  title: "Lion’s Strength",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
