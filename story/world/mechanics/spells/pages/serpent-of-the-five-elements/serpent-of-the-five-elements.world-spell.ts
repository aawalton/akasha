import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const serpentOfTheFiveElements = {
  id: "01a06572-95df-76c2-95e8-1bf8c3d0b778",
  type: "page-type/world-spell",
  slug: "serpent-of-the-five-elements",
  title: "Serpent of the Five Elements",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
