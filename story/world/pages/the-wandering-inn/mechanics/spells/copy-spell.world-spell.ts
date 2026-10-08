import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const copySpell = {
  id: "01a06572-95bb-7eb6-ae13-b3806b7fce11",
  type: "page-type/world-spell",
  slug: "copy-spell",
  title: "Copy Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
