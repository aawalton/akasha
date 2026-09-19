import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const deathWail = {
  id: "01a06572-95bb-7a6c-8671-9f12c138b89c",
  type: "page-type/world-spell",
  slug: "death-wail",
  title: "Death Wail",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
