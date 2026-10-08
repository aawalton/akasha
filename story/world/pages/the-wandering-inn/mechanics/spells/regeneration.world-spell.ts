import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const regeneration = {
  id: "01a06572-95dc-7ac6-980b-a1f4d334f4cf",
  type: "page-type/world-spell",
  slug: "regeneration",
  title: "Regeneration",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
