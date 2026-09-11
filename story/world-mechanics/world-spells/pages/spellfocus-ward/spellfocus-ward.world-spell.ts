import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spellfocusWard = {
  id: "01a06572-95e2-7c16-8141-37c9b467798f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spellfocus-ward",
  title: "Spellfocus Ward",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
