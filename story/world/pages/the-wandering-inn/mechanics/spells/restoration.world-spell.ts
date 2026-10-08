import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const restoration = {
  id: "01a06572-95dd-7bd9-85c2-2795fb8efe58",
  type: "page-type/world-spell",
  slug: "restoration",
  title: "Restoration",
  world: "world/the-wandering-inn",
  appearanceCount: 34,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.421Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
