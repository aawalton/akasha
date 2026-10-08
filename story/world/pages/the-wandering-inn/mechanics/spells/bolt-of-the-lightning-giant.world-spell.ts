import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boltOfTheLightningGiant = {
  id: "01a06572-95b7-78ae-b79c-eb390f15644c",
  type: "page-type/world-spell",
  slug: "bolt-of-the-lightning-giant",
  title: "Bolt of the Lightning Giant",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.383Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
