import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const windJet = {
  id: "01a06572-95ea-7982-9fcb-8b65dfd6308c",
  type: "page-type/world-spell",
  slug: "wind-jet",
  title: "Wind Jet",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.434Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
