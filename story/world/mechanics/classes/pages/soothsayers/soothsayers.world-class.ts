import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const soothsayers = {
  id: "01a06586-0a4d-74e9-ace0-87a172cd4c3c",
  type: "page-type/world-class",
  slug: "soothsayers",
  title: "Soothsayers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
