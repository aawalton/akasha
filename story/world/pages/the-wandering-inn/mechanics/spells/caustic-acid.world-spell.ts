import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const causticAcid = {
  id: "01a06572-95b8-7614-b06b-52642bb17725",
  type: "page-type/world-spell",
  slug: "caustic-acid",
  title: "Caustic Acid",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
