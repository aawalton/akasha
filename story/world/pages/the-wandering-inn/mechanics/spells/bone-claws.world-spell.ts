import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boneClaws = {
  id: "01a06572-95b7-7ab6-8f19-368b3c60f178",
  type: "page-type/world-spell",
  slug: "bone-claws",
  title: "Bone Claws",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.383Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
