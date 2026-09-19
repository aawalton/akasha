import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warriorOfPomle = {
  id: "01a0657e-0270-798b-a86f-7bd7d036835d",
  type: "page-type/world-class",
  slug: "warrior-of-pomle",
  title: "Warrior of Pomle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
