import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const warmth = {
  id: "01a06572-95e9-7165-b4c1-161240f983d9",
  type: "page-type/world-spell",
  slug: "warmth",
  title: "Warmth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
