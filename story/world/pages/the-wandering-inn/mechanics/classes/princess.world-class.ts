import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const princess = {
  id: "01a06586-0a16-743c-b5bb-40c8cb8fe2b5",
  type: "page-type/world-class",
  slug: "princess",
  title: "Princess",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["worldly-princess"],
  references: "jsonl",
} as const satisfies WorldClass
