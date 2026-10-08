import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const collectiveLightning = {
  id: "01a06572-95b9-7dd9-9bc5-d997c6905bb4",
  type: "page-type/world-spell",
  slug: "collective-lightning",
  title: "Collective Lightning",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.385Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
