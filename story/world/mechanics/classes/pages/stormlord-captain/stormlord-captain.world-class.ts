import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stormlordCaptain = {
  id: "01a06586-0a55-7fc9-ad3a-18406a813004",
  type: "page-type/world-class",
  slug: "stormlord-captain",
  title: "Stormlord Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
