import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dustStorm = {
  id: "01a06572-95be-78a0-9ee0-f2eff4710f1b",
  type: "page-type/world-spell",
  slug: "dust-storm",
  title: "Dust Storm",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
