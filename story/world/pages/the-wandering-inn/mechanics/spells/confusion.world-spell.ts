import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const confusion = {
  id: "01a06572-95b9-7356-84dd-c408d69b92f6",
  type: "page-type/world-spell",
  slug: "confusion",
  title: "Confusion",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.385Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
