import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const calmEmotions = {
  id: "01a06572-95b8-7a81-9934-c9cd85372b30",
  type: "page-type/world-spell",
  slug: "calm-emotions",
  title: "Calm Emotions",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
