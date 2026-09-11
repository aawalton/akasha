import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shatterbolt = {
  id: "01a06572-95e0-7eb8-b8ea-12237feea356",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "shatterbolt",
  title: "Shatterbolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
