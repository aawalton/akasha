import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pirateFarmer = {
  id: "01a06586-0a07-72f1-94c0-bad477c54473",
  type: "page-type/world-class",
  slug: "pirate-farmer",
  title: "Pirate Farmer",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.343Z",
  updatedAt: "2026-09-22T13:29:43.000Z",
} as const satisfies WorldClass
