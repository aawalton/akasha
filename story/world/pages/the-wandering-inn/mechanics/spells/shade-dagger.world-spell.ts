import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shadeDagger = {
  id: "01a06572-95df-7e92-b415-f7beba89400c",
  type: "page-type/world-spell",
  slug: "shade-dagger",
  title: "Shade Dagger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
