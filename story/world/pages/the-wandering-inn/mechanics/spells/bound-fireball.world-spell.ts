import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boundFireball = {
  id: "01a06572-95b7-7aa8-89b3-b142284aa21f",
  type: "page-type/world-spell",
  slug: "bound-fireball",
  title: "Bound Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.383Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
