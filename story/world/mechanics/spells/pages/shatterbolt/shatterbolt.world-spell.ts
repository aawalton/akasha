import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shatterbolt = {
  id: "01a06572-95e0-7eb8-b8ea-12237feea356",
  type: "page-type/world-spell",
  slug: "shatterbolt",
  title: "Shatterbolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
