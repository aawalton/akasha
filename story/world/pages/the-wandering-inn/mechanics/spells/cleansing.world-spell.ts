import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cleansing = {
  id: "01a06572-95b9-7c5e-be08-981b42917486",
  type: "page-type/world-spell",
  slug: "cleansing",
  title: "Cleansing",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.385Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
