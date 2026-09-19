import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const policymaker = {
  id: "01a06586-0a0a-76ff-b42f-45b0dd28ff12",
  type: "page-type/world-class",
  slug: "policymaker",
  title: "Policymaker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
