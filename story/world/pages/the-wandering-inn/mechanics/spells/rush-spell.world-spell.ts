import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rushSpell = {
  id: "01a06572-95de-71c0-a0f0-171280b76f3b",
  type: "page-type/world-spell",
  slug: "rush-spell",
  title: "Rush Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.422Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
