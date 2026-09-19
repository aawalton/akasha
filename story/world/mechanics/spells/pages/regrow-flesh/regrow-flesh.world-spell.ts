import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const regrowFlesh = {
  id: "01a06572-95dc-79f9-86a3-d0504117ea51",
  type: "page-type/world-spell",
  slug: "regrow-flesh",
  title: "Regrow Flesh",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
