import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const conscripts = {
  id: "01a0657e-134c-711a-bf83-4e14afe0d7ff",
  type: "page-type/world-class",
  slug: "conscripts",
  title: "Conscripts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
