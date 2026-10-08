import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const farsight = {
  id: "01a06572-95c0-7b2e-a4d6-d4a2011675d9",
  type: "page-type/world-spell",
  slug: "farsight",
  title: "Farsight",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.392Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
