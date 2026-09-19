import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bugExterminator = {
  id: "01a0657e-01c0-73c7-af37-0c954505d01a",
  type: "page-type/world-class",
  slug: "bug-exterminator",
  title: "Bug Exterminator",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
