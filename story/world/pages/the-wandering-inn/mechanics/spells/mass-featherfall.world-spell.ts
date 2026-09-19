import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massFeatherfall = {
  id: "01a06572-95d1-72f5-b48d-5489bf6cccf2",
  type: "page-type/world-spell",
  slug: "mass-featherfall",
  title: "Mass Featherfall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
