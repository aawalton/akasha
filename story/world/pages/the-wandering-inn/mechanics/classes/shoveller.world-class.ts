import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shoveller = {
  id: "01a06586-0a3c-722b-bd16-b3e3c24ccc34",
  type: "page-type/world-class",
  slug: "shoveller",
  title: "Shoveller",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
