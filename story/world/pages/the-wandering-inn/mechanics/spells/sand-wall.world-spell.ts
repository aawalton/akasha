import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sandWall = {
  id: "01a06572-95de-7528-ae77-ffab5e7d4e51",
  type: "page-type/world-spell",
  slug: "sand-wall",
  title: "Sand Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.422Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
