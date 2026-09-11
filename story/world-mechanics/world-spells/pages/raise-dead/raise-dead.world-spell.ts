import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const raiseDead = {
  id: "01a06572-95dc-7099-91f2-4fce10a77db7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "raise-dead",
  title: "Raise Dead",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
