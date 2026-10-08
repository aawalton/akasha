import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const antFarmer = {
  id: "01a0657e-132c-7e9a-9808-1972c5c7719f",
  type: "page-type/world-class",
  slug: "ant-farmer",
  title: "Ant Farmer",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/bug-collector"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.396Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
