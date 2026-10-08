import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const invisibility = {
  id: "01a06572-95cc-7035-859a-4f76eb0676c0",
  type: "page-type/world-spell",
  slug: "invisibility",
  title: "Invisibility",
  world: "world/the-wandering-inn",
  appearanceCount: 92,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
