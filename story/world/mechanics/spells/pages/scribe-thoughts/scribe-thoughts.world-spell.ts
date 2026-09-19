import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const scribeThoughts = {
  id: "01a06572-95de-7b3d-a21f-765a56900cce",
  type: "page-type/world-spell",
  slug: "scribe-thoughts",
  title: "Scribe Thoughts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
