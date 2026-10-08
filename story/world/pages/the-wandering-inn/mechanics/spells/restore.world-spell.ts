import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const restore = {
  id: "01a06572-95dd-717e-bacc-368d252b42a9",
  type: "page-type/world-spell",
  slug: "restore",
  title: "Restore",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.421Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
