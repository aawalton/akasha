import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swashbuckler = {
  id: "01a06586-0a60-74e9-8ebd-92fcaae79c7f",
  type: "page-type/world-class",
  slug: "swashbuckler",
  title: "Swashbuckler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
