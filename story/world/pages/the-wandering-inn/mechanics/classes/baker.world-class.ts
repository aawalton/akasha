import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const baker = {
  id: "01a0657e-1337-725b-8b42-da3187a5d79b",
  type: "page-type/world-class",
  slug: "baker",
  title: "Baker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
