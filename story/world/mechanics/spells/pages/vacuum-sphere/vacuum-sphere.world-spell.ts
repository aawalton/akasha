import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const vacuumSphere = {
  id: "01a06572-95e8-7bb1-ab68-75d3db1d57f7",
  type: "page-type/world-spell",
  slug: "vacuum-sphere",
  title: "Vacuum Sphere",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
