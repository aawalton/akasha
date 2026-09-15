import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const flunkies = {
  id: "01a0657e-01dd-7b86-88e8-4ba792902b41",
  type: "world-class",
  slug: "flunkies",
  title: "Flunkies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
