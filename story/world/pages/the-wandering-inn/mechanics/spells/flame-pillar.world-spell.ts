import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flamePillar = {
  id: "01a06572-95c3-7b72-bf9b-36daed522ad6",
  type: "page-type/world-spell",
  slug: "flame-pillar",
  title: "Flame Pillar",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
