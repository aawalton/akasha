import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bloodScythes = {
  id: "01a06572-95b6-77c2-9e9e-a2408224823f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "blood-scythes",
  title: "Blood Scythes",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
