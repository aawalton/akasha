import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sneakThug = {
  id: "01a06586-0a44-7128-9194-e16f42f6f156",
  type: "page-type/world-class",
  slug: "sneak-thug",
  title: "Sneak Thug",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
