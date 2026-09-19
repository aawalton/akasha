import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneSphere = {
  id: "01a06572-95e3-77c9-8e8d-de3d81094108",
  type: "page-type/world-spell",
  slug: "stone-sphere",
  title: "Stone Sphere",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
