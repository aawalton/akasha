import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicNull = {
  id: "01a06572-95d1-7941-aa36-f32dbbb8ef83",
  type: "page-type/world-spell",
  slug: "magic-null",
  title: "Magic Null",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
