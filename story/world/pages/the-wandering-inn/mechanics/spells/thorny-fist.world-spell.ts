import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const thornyFist = {
  id: "01a06572-95e6-7223-87a2-4e5ed51f8de4",
  type: "page-type/world-spell",
  slug: "thorny-fist",
  title: "Thorny Fist",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
