import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightSpear = {
  id: "01a06572-95ce-78dd-92d4-95b87fda1f42",
  type: "page-type/world-spell",
  slug: "light-spear",
  title: "Light Spear",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.406Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
