import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const socialClimber = {
  id: "01a06586-0a45-7042-8e8d-342f50e96109",
  type: "page-type/world-class",
  slug: "social-climber",
  title: "Social Climber",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
