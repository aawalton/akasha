import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gateway = {
  id: "01a06572-95c6-7ec0-bc47-4d31d4d79c9d",
  type: "page-type/world-spell",
  slug: "gateway",
  title: "Gateway",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
