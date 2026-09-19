import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const learnedWarrior = {
  id: "01a0657e-138d-7f49-9087-49e98bfa0a3d",
  type: "page-type/world-class",
  slug: "learned-warrior",
  title: "Learned Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
