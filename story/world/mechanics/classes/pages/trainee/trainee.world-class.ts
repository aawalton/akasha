import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const trainee = {
  id: "01a0657e-026c-74b4-ba95-8045f9a2b859",
  type: "page-type/world-class",
  slug: "trainee",
  title: "Trainee",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
