import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const createManaDeath = {
  id: "01a06572-95bb-7367-af6b-2920918b8efe",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "create-mana-death",
  title: "Create Mana: Death",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
