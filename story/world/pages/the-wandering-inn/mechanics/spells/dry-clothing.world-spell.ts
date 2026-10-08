import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dryClothing = {
  id: "01a06572-95be-7b22-9a71-d9e47c3cc24b",
  type: "page-type/world-spell",
  slug: "dry-clothing",
  title: "Dry Clothing",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
