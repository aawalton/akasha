import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fireballing = {
  id: "01a06572-95c2-750b-a20c-5f94c92591de",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "fireballing",
  title: "Fireballing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
