import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bubbleOfSilence = {
  id: "01a06572-95b7-79c1-9d17-4fb81d2c7c52",
  type: "page-type/world-spell",
  slug: "bubble-of-silence",
  title: "Bubble of Silence",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.383Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
