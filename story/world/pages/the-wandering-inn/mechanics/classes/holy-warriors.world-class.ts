import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const holyWarriors = {
  id: "01a0657e-1374-7fac-943c-12a5c67344ba",
  type: "page-type/world-class",
  slug: "holy-warriors",
  title: "Holy Warriors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
