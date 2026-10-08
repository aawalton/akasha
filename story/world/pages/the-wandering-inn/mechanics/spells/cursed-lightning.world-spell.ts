import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cursedLightning = {
  id: "01a06572-95bb-74c3-b045-da5cd36d4231",
  type: "page-type/world-spell",
  slug: "cursed-lightning",
  title: "Cursed Lightning",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
