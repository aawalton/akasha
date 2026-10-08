import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flashFireball = {
  id: "01a06572-95c3-777a-b967-2106dc60387d",
  type: "page-type/world-spell",
  slug: "flash-fireball",
  title: "Flash Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
