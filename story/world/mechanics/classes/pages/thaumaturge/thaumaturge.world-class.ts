import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const thaumaturge = {
  id: "01a06586-0a65-79a0-b196-edef21fa8308",
  type: "page-type/world-class",
  slug: "thaumaturge",
  title: "Thaumaturge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
