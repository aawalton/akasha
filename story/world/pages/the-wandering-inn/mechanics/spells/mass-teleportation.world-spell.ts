import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massTeleportation = {
  id: "01a06572-95d2-7c31-92ac-2f29447678a9",
  type: "page-type/world-spell",
  slug: "mass-teleportation",
  title: "Mass Teleportation",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.410Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
