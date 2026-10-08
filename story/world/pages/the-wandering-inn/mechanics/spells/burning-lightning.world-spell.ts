import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const burningLightning = {
  id: "01a06572-95b8-7e01-ba46-78c1244ce9ff",
  type: "page-type/world-spell",
  slug: "burning-lightning",
  title: "Burning Lightning",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
