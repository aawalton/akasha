import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spireOfMud = {
  id: "01a06572-95e2-74bb-90a4-665ab38ecc5d",
  type: "page-type/world-spell",
  slug: "spire-of-mud",
  title: "Spire of Mud",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
