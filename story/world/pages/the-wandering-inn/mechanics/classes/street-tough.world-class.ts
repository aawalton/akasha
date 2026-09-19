import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const streetTough = {
  id: "01a06586-0a5d-7547-ad46-b3a75616b87b",
  type: "page-type/world-class",
  slug: "street-tough",
  title: "Street Tough",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
