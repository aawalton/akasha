import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const botanist = {
  id: "01a0657e-01bf-7019-b322-00960cfbb352",
  type: "world-class",
  slug: "botanist",
  title: "Botanist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
