import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceLance = {
  id: "01a06572-95c9-7762-8cfd-3399d4c74370",
  type: "page-type/world-spell",
  slug: "ice-lance",
  title: "Ice Lance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
