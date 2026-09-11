import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wallOfBones = {
  id: "01a06572-95e8-7a23-8f5c-bb7dd5e4cb8f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "wall-of-bones",
  title: "Wall of Bones",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
