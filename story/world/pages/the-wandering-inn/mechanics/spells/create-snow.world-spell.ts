import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createSnow = {
  id: "01a06572-95bb-73e1-9b44-2a8c3b9ceee6",
  type: "page-type/world-spell",
  slug: "create-snow",
  title: "Create Snow",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
