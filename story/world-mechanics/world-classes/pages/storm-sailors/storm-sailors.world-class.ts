import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const stormSailors = {
  id: "01a06586-0a55-78d0-b1e3-8a18a8e82802",
  type: "world-class",
  slug: "storm-sailors",
  title: "Storm Sailors",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
