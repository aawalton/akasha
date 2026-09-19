import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const skeletonWarrior = {
  id: "01a0657e-0256-789b-a3a1-23c03c11b190",
  type: "page-type/world-class",
  slug: "skeleton-warrior",
  title: "Skeleton Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
