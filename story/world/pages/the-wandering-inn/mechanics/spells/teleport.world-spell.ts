import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const teleport = {
  id: "01a06572-95e6-7a17-96ff-0bfb3117a1ad",
  type: "page-type/world-spell",
  slug: "teleport",
  title: "Teleport",
  world: "world/the-wandering-inn",
  appearanceCount: 21,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
