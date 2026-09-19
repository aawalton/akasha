import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tourists = {
  id: "01a06586-0a68-7286-ab3f-a23e50ff4512",
  type: "page-type/world-class",
  slug: "tourists",
  title: "Tourists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
