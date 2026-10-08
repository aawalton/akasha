import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lesserTeleport = {
  id: "01a06572-95cd-7e97-92bf-3f0b3736c7c3",
  type: "page-type/world-spell",
  slug: "lesser-teleport",
  title: "Lesser Teleport",
  world: "world/the-wandering-inn",
  appearanceCount: 37,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.405Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
