import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boneRapier = {
  id: "01a06572-95b7-7ac9-b991-60ea566d5a10",
  type: "page-type/world-spell",
  slug: "bone-rapier",
  title: "Bone Rapier",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.383Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
