import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fighter = {
  id: "01a0657e-01dc-7b16-a891-932570ca4b94",
  type: "page-type/world-class",
  slug: "fighter",
  title: "Fighter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
