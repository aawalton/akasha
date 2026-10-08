import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const grandFireball = {
  id: "01a06572-95c6-734a-8062-ff497688ca95",
  type: "page-type/world-spell",
  slug: "grand-fireball",
  title: "Grand Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 18,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
