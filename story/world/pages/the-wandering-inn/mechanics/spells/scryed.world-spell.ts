import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const scryed = {
  id: "01a06572-95de-7b73-a156-ad91f2ab95f5",
  type: "page-type/world-spell",
  slug: "scryed",
  title: "Scryed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
