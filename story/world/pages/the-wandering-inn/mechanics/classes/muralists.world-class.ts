import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const muralists = {
  id: "01a0657e-13a3-766f-9fb7-21c111ba3eca",
  type: "page-type/world-class",
  slug: "muralists",
  title: "Muralists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
