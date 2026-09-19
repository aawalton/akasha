import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const striker = {
  id: "01a0657e-0261-7dfb-a5b0-8135dd45030c",
  type: "page-type/world-class",
  slug: "striker",
  title: "Striker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
