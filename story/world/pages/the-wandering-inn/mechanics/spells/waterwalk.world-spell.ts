import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterwalk = {
  id: "01a06572-95e9-716d-a0bd-af2d50289020",
  type: "page-type/world-spell",
  slug: "waterwalk",
  title: "Waterwalk",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
