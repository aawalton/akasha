import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const traineeGuard = {
  id: "01a06586-0a6a-7d76-8f9b-130eee3a8d25",
  type: "page-type/world-class",
  slug: "trainee-guard",
  title: "Trainee Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
