import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostMist = {
  id: "01a06572-95c5-78a8-a1f3-a8494d310809",
  type: "page-type/world-spell",
  slug: "frost-mist",
  title: "Frost Mist",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
