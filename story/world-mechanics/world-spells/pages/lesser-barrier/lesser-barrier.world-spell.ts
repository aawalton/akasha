import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lesserBarrier = {
  id: "01a06572-95cc-7968-a49f-d21ef2f976d5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lesser-barrier",
  title: "Lesser Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
