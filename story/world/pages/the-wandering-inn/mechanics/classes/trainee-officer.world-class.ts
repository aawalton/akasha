import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const traineeOfficer = {
  id: "01a06586-0a6a-7ee1-b256-405805803a3c",
  type: "page-type/world-class",
  slug: "trainee-officer",
  title: "Trainee Officer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
