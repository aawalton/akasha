import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mendBone = {
  id: "01a06572-95d2-7c9c-936e-a306ca99fb7f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mend-bone",
  title: "Mend Bone",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
