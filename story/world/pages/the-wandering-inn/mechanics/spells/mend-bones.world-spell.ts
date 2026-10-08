import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mendBones = {
  id: "01a06572-95d2-7f0a-bf75-b98f8fe22968",
  type: "page-type/world-spell",
  slug: "mend-bones",
  title: "Mend Bones",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.410Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
