import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const patrolLeader = {
  id: "01a0657e-13b6-7f9c-844f-0f4c51545aa5",
  type: "world-class",
  slug: "patrol-leader",
  title: "Patrol Leader",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
