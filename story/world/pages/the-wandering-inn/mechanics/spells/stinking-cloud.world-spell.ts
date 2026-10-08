import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stinkingCloud = {
  id: "01a06572-95e3-79e6-8cb6-f580e4b29116",
  type: "page-type/world-spell",
  slug: "stinking-cloud",
  title: "Stinking Cloud",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
