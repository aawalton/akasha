import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const highSpeedFlight = {
  id: "01a06572-95c8-75f0-a56a-d5edf28544eb",
  type: "page-type/world-spell",
  slug: "high-speed-flight",
  title: "High-Speed Flight",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
