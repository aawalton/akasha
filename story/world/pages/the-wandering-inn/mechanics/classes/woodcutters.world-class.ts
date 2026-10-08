import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const woodcutters = {
  id: "01a06586-0a83-709d-b9a3-bd42f67cd8c9",
  type: "page-type/world-class",
  slug: "woodcutters",
  title: "Woodcutters",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.467Z",
  updatedAt: "2026-09-22T13:30:28.000Z",
} as const satisfies WorldClass
