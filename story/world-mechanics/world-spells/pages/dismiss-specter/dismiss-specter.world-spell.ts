import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const dismissSpecter = {
  id: "01a06572-95bd-7cd4-ae76-3edb58ca6f7a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dismiss-specter",
  title: "Dismiss Specter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
