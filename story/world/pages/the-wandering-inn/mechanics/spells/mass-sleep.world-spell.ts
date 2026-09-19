import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massSleep = {
  id: "01a06572-95d2-77a5-b4b9-abfb0184b6d2",
  type: "page-type/world-spell",
  slug: "mass-sleep",
  title: "Mass Sleep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
