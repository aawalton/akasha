import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const veteranScout = {
  id: "01a06586-0a6f-7e80-b32b-4c26c03aa8f2",
  type: "world-class",
  slug: "veteran-scout",
  title: "Veteran Scout",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["bowman-of-loss"],
  references: "jsonl",
} as const satisfies WorldClass
