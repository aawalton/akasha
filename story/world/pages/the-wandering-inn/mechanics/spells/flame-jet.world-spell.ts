import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameJet = {
  id: "01a06572-95c3-71fb-92ee-d45f8bbfa0ec",
  type: "page-type/world-spell",
  slug: "flame-jet",
  title: "Flame Jet",
  world: "world/the-wandering-inn",
  appearanceCount: 14,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
