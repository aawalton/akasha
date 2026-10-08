import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const displayMemoriesFactoid = {
  id: "01a06572-95be-7d0e-a18e-0c9fa3c0ec2a",
  type: "page-type/world-spell",
  slug: "display-memories-factoid",
  title: "Display Memories: Factoid",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
