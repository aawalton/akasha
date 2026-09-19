import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const serpent = {
  id: "01a06572-95df-7292-96ad-ff80fbc0ec1c",
  type: "page-type/world-spell",
  slug: "serpent",
  title: "Serpent",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
