import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blueLightning = {
  id: "01a06572-95b6-7c5a-b8ed-21cd5a88c7a7",
  type: "page-type/world-spell",
  slug: "blue-lightning",
  title: "Blue Lightning",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
