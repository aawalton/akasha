import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const levitation = {
  id: "01a06572-95cd-7f21-8fee-7df57084e2ce",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "levitation",
  title: "Levitation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
