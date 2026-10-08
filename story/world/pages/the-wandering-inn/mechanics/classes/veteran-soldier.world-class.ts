import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const veteranSoldier = {
  id: "01a06586-0a6f-7118-b3c6-2e9a1b4f2276",
  type: "page-type/world-class",
  slug: "veteran-soldier",
  title: "Veteran Soldier",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.447Z",
  updatedAt: "2026-09-22T13:30:22.000Z",
} as const satisfies WorldClass
