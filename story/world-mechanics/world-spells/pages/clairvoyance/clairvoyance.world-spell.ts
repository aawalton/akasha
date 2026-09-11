import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const clairvoyance = {
  id: "01a06572-95b9-7128-bf41-f66c8c9f1a4f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "clairvoyance",
  title: "Clairvoyance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
