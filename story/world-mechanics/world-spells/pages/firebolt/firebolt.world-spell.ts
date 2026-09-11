import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const firebolt = {
  id: "01a06572-95c2-78c9-9129-ddfe1e33054c",
  type: "world-spell",
  slug: "firebolt",
  title: "Firebolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
