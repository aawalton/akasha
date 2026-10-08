import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const expeditedTeleport = {
  id: "01a06572-95bf-7c5f-91fd-9e99598496a6",
  type: "page-type/world-spell",
  slug: "expedited-teleport",
  title: "Expedited Teleport",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
