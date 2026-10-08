import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostRay = {
  id: "01a06572-95c5-7cdb-846d-7475ac2d36df",
  type: "page-type/world-spell",
  slug: "frost-ray",
  title: "Frost Ray",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
