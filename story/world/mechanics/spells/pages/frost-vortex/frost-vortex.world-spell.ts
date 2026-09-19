import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostVortex = {
  id: "01a06572-95c5-79bf-a31b-4aade2ce9352",
  type: "page-type/world-spell",
  slug: "frost-vortex",
  title: "Frost Vortex",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
