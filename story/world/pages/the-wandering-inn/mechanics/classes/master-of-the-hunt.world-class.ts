import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const masterOfTheHunt = {
  id: "01a0657e-022f-7ae7-a170-874b14d9030d",
  type: "page-type/world-class",
  slug: "master-of-the-hunt",
  title: "Master of the Hunt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
