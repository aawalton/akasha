import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const suspendedMotion = {
  id: "01a06572-95e4-740b-a1bb-5cee442b675c",
  type: "page-type/world-spell",
  slug: "suspended-motion",
  title: "Suspended Motion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
