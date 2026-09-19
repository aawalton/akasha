import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const searingLight = {
  id: "01a06572-95df-7335-8967-62909aa3b64f",
  type: "page-type/world-spell",
  slug: "searing-light",
  title: "Searing Light",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
