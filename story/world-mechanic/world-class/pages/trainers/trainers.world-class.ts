import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const trainers = {
  id: "01a0657e-026c-7c34-b29e-63a2efc00224",
  type: "world-class",
  slug: "trainers",
  title: "Trainers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
