import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const veteranWarrior = {
  id: "01a0657e-026e-71e9-af9f-4da88ecd07fb",
  type: "page-type/world-class",
  slug: "veteran-warrior",
  title: "Veteran Warrior",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-class/exemplar-warrior"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.110Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
