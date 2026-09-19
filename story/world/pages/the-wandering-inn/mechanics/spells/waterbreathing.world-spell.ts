import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterbreathing = {
  id: "01a06572-95e9-7794-b1bd-fa04c461a40c",
  type: "page-type/world-spell",
  slug: "waterbreathing",
  title: "Waterbreathing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
