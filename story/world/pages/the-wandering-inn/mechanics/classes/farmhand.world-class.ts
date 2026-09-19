import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const farmhand = {
  id: "01a0657e-1363-7f41-bf6f-4228c97cf7c0",
  type: "page-type/world-class",
  slug: "farmhand",
  title: "Farmhand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
