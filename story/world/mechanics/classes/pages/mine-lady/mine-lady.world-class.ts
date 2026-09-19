import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mineLady = {
  id: "01a0657e-13a2-7df3-a533-4ab6eb912f8a",
  type: "page-type/world-class",
  slug: "mine-lady",
  title: "Mine Lady",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
