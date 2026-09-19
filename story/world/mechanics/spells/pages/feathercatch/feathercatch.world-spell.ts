import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const feathercatch = {
  id: "01a06572-95c0-7089-95fb-97593bb2f615",
  type: "page-type/world-spell",
  slug: "feathercatch",
  title: "Feathercatch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
