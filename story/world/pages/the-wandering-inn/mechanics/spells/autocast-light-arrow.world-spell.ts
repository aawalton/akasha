import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const autocastLightArrow = {
  id: "01a06572-95b5-76cb-af0f-ba2a94647d8d",
  type: "page-type/world-spell",
  slug: "autocast-light-arrow",
  title: "Autocast: Light Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
