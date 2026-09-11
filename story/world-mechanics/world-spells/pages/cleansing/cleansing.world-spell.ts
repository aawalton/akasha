import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const cleansing = {
  id: "01a06572-95b9-7c5e-be08-981b42917486",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "cleansing",
  title: "Cleansing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
