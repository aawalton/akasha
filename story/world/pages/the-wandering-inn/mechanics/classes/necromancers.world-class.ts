import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const necromancers = {
  id: "01a0657e-13b1-7e50-86e1-26ffd0f6168c",
  type: "page-type/world-class",
  slug: "necromancers",
  title: "Necromancers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
