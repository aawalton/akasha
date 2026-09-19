import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const scribeText = {
  id: "01a06572-95de-7c91-9932-e5bbf64b41ef",
  type: "page-type/world-spell",
  slug: "scribe-text",
  title: "Scribe Text",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
