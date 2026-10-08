import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flashOfInsight = {
  id: "01a06572-95c3-714d-9d1b-1796a4d4f654",
  type: "page-type/world-spell",
  slug: "flash-of-insight",
  title: "Flash of Insight",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
