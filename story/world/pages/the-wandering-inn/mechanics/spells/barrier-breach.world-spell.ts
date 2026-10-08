import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierBreach = {
  id: "01a06572-95b5-71e2-b04f-6294dc6f2f14",
  type: "page-type/world-spell",
  slug: "barrier-breach",
  title: "Barrier Breach",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
