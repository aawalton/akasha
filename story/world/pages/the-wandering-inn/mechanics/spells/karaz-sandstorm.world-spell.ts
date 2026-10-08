import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const karazSandstorm = {
  id: "01a06572-95cc-7df9-8688-27ba9eee8cd7",
  type: "page-type/world-spell",
  slug: "karaz-sandstorm",
  title: "Karaz Sandstorm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
