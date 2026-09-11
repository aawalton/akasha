import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const removeParalysis = {
  id: "01a06572-95dd-7015-b059-00ee65842463",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "remove-paralysis",
  title: "Remove Paralysis",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
