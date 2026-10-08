import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gloriousRadiance = {
  id: "01a06572-95c6-736f-8f93-59c7ffbcc7c6",
  type: "page-type/world-spell",
  slug: "glorious-radiance",
  title: "Glorious Radiance",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
