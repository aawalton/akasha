import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const popstar = {
  id: "01a06586-0a0a-7a55-889e-9b61932ffc6c",
  type: "page-type/world-class",
  slug: "popstar",
  title: "Popstar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
