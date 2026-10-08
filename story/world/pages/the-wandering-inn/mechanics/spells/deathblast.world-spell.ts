import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const deathblast = {
  id: "01a06572-95bc-76b7-a25c-6b9014be16a3",
  type: "page-type/world-spell",
  slug: "deathblast",
  title: "Deathblast",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.388Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
