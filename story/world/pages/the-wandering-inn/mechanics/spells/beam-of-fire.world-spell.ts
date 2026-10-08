import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const beamOfFire = {
  id: "01a06572-95b5-7bb2-b33d-06353c958c8e",
  type: "page-type/world-spell",
  slug: "beam-of-fire",
  title: "Beam of Fire",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
