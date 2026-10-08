import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createWater = {
  id: "01a06572-95bb-7682-9da8-c0133790e35f",
  type: "page-type/world-spell",
  slug: "create-water",
  title: "Create Water",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
