import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const reverseGravity = {
  id: "01a06572-95dd-72ed-9460-40d58a92c486",
  type: "page-type/world-spell",
  slug: "reverse-gravity",
  title: "Reverse Gravity",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.421Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
