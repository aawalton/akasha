import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const toxicMists = {
  id: "01a06572-95e7-75b7-bb9e-189bd0e66b31",
  type: "world-spell",
  slug: "toxic-mists",
  title: "Toxic Mists",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
