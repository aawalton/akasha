import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostVortex = {
  id: "01a06572-95c5-79bf-a31b-4aade2ce9352",
  type: "page-type/world-spell",
  slug: "frost-vortex",
  title: "Frost Vortex",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
