import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const alarm = {
  id: "01a06572-95b3-7788-9cfc-3a9cfeaf75a4",
  type: "page-type/world-spell",
  slug: "alarm",
  title: "Alarm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.379Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
