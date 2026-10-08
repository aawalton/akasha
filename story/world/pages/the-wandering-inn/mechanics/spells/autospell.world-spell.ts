import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const autospell = {
  id: "01a06572-95b5-70e8-a06e-fe7eeb712684",
  type: "page-type/world-spell",
  slug: "autospell",
  title: "Autospell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
