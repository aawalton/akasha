import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const geas = {
  id: "01a06572-95c6-7e79-9d7d-d8940175625a",
  type: "page-type/world-spell",
  slug: "geas",
  title: "Geas",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
