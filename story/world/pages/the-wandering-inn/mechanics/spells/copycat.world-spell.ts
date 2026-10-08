import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const copycat = {
  id: "01a06572-95bb-7db3-a216-ee11af26a9ef",
  type: "page-type/world-spell",
  slug: "copycat",
  title: "Copycat",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
