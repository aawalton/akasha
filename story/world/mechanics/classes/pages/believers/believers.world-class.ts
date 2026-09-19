import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const believers = {
  id: "01a0657e-01b7-7c74-8e99-de9500d3407f",
  type: "page-type/world-class",
  slug: "believers",
  title: "Believers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
