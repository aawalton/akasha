import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shade = {
  id: "01a06572-95df-7d23-851e-9076c9102b84",
  type: "page-type/world-spell",
  slug: "shade",
  title: "Shade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
