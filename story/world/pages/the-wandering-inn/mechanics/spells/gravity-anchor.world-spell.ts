import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gravityAnchor = {
  id: "01a06572-95c6-726e-bd8a-398e6b971e9f",
  type: "page-type/world-spell",
  slug: "gravity-anchor",
  title: "Gravity Anchor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
