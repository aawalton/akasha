import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waterSphere = {
  id: "01a06572-95e9-7e87-8c1f-47f855bfa5a4",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "water-sphere",
  title: "Water Sphere",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
