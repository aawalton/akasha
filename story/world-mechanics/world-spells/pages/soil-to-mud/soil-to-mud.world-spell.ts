import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const soilToMud = {
  id: "01a06572-95e1-7f20-a40b-e7438363e8a3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "soil-to-mud",
  title: "Soil to Mud",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
