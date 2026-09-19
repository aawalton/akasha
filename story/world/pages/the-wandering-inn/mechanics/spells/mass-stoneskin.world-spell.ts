import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massStoneskin = {
  id: "01a06572-95d2-7191-be84-244ff3cd8bc5",
  type: "page-type/world-spell",
  slug: "mass-stoneskin",
  title: "Mass Stoneskin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
