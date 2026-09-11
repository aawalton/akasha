import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const villager = {
  id: "01a06586-0a70-73f0-b927-b242b9b1c099",
  type: "world-class",
  slug: "villager",
  title: "Villager",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
