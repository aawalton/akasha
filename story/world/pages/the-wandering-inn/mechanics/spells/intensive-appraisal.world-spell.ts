import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const intensiveAppraisal = {
  id: "01a06572-95cb-7856-8061-ad5ce676a7cd",
  type: "page-type/world-spell",
  slug: "intensive-appraisal",
  title: "Intensive Appraisal",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
