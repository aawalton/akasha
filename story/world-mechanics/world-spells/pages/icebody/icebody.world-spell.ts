import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const icebody = {
  id: "01a06572-95ca-7d41-ad6b-e3fd8b135f2d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "icebody",
  title: "Icebody",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
