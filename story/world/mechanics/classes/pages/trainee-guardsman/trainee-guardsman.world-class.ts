import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const traineeGuardsman = {
  id: "01a0657e-026c-7e56-b17a-0ad6c85e42aa",
  type: "page-type/world-class",
  slug: "trainee-guardsman",
  title: "Trainee Guardsman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
