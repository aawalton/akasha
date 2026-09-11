import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const cleansingBubbleBarrier = {
  id: "01a06572-95b9-772d-ba9a-f1b1f0d35426",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "cleansing-bubble-barrier",
  title: "Cleansing Bubble Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
