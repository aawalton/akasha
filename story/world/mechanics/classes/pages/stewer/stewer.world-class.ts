import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stewer = {
  id: "01a06586-0a54-7068-9f52-b17b3d55be45",
  type: "page-type/world-class",
  slug: "stewer",
  title: "Stewer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
