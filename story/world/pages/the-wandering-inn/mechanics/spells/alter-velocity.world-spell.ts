import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const alterVelocity = {
  id: "01a06572-95b4-740e-a508-7bb3ae7b9262",
  type: "page-type/world-spell",
  slug: "alter-velocity",
  title: "Alter Velocity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
