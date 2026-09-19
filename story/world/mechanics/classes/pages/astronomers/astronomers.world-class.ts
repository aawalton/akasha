import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const astronomers = {
  id: "01a0657e-1336-7919-b1ef-d4955e5b6fd9",
  type: "page-type/world-class",
  slug: "astronomers",
  title: "Astronomers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
