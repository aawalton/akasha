import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const threskSSeekers = {
  id: "01a06572-95e6-783e-a28b-ef6055bc284f",
  type: "page-type/world-spell",
  slug: "thresk-s-seekers",
  title: "Thresk’s Seekers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
