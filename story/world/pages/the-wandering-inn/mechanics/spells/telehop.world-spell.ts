import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const telehop = {
  id: "01a06572-95e5-7706-8962-a7642df7450f",
  type: "page-type/world-spell",
  slug: "telehop",
  title: "Telehop",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.429Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
