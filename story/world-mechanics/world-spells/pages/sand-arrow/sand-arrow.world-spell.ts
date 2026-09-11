import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sandArrow = {
  id: "01a06572-95de-7928-89f8-be49b72f387d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "sand-arrow",
  title: "Sand Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
