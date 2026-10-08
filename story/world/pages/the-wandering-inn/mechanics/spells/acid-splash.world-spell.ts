import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const acidSplash = {
  id: "01a06572-95b3-75c7-8fa7-fa7dbae444c0",
  type: "page-type/world-spell",
  slug: "acid-splash",
  title: "Acid Splash",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.379Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
