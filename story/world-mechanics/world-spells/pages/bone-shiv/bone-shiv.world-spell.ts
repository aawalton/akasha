import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boneShiv = {
  id: "01a06572-95b7-748f-bd47-7ca1d1311930",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bone-shiv",
  title: "Bone Shiv",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
