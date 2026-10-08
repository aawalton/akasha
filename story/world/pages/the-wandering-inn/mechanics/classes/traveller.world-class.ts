import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const traveller = {
  id: "01a06586-0a6c-7e16-a36a-188a1d10f44b",
  type: "page-type/world-class",
  slug: "traveller",
  title: "Traveller",
  world: "world/the-wandering-inn",
  appearanceCount: 14,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.444Z",
  updatedAt: "2026-09-22T13:30:22.000Z",
} as const satisfies WorldClass
