import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const farSight = {
  id: "01a06572-95c0-70ac-a028-a8da021cc2e7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "far-sight",
  title: "Far Sight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
