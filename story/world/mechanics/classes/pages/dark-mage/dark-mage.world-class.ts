import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const darkMage = {
  id: "01a0657e-1351-7dd1-b4d7-ee02962ac03c",
  type: "page-type/world-class",
  slug: "dark-mage",
  title: "Dark Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
