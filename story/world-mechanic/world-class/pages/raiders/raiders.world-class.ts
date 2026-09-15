import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const raiders = {
  id: "01a06586-0a1c-7646-bb95-2ee0ab6230b9",
  type: "world-class",
  slug: "raiders",
  title: "Raiders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
