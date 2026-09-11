import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const removeIntoxication = {
  id: "01a06572-95dc-74b4-b5ff-fbf74c9d13e5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "remove-intoxication",
  title: "Remove Intoxication",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
