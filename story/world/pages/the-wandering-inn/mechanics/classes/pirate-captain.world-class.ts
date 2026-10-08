import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pirateCaptain = {
  id: "01a06586-0a07-744f-8f16-cef801c61058",
  type: "page-type/world-class",
  slug: "pirate-captain",
  title: "Pirate Captain",
  world: "world/the-wandering-inn",
  appearanceCount: 24,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.343Z",
  updatedAt: "2026-09-22T13:29:43.000Z",
} as const satisfies WorldClass
