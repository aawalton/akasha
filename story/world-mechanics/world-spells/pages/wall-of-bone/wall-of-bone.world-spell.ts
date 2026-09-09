import type { WorldSpell } from "../../world-spell.page-type.ts"

export const wallOfBone = {
  id: "01a06572-95e8-7204-9255-bb456852f2ea",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "wall-of-bone",
  title: "Wall of Bone",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
