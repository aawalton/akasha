import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const joyousSpirits = {
  id: "01a06572-95cc-7486-a230-0609f809139c",
  type: "page-type/world-spell",
  slug: "joyous-spirits",
  title: "Joyous Spirits",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
