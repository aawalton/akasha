import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tundraWarrior = {
  id: "01a06586-0a6d-7c19-9205-86876dc69a8f",
  type: "page-type/world-class",
  slug: "tundra-warrior",
  title: "Tundra Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
