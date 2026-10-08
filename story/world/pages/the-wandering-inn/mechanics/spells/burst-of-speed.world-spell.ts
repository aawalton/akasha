import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const burstOfSpeed = {
  id: "01a06572-95b8-74c6-b15f-96e1cde68d49",
  type: "page-type/world-spell",
  slug: "burst-of-speed",
  title: "Burst of Speed",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
