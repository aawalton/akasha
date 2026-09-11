import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const acceleratedMovement = {
  id: "01a06572-95b3-78c0-9ad6-b6e05d8c8126",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "accelerated-movement",
  title: "Accelerated Movement",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
