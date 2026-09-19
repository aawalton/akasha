import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const firespark = {
  id: "01a06572-95c2-7e54-a0f7-3a77fb91a5d9",
  type: "page-type/world-spell",
  slug: "firespark",
  title: "Firespark",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
