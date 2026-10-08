import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blindness = {
  id: "01a06572-95b6-7a10-93da-56cdcd8626a6",
  type: "page-type/world-spell",
  slug: "blindness",
  title: "Blindness",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
