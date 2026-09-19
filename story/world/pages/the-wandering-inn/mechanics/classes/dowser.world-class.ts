import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dowser = {
  id: "01a0657e-1356-7e5b-bab5-fe6c3ec20ec2",
  type: "page-type/world-class",
  slug: "dowser",
  title: "Dowser",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
