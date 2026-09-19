import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const smuggler = {
  id: "01a0657e-025a-76ec-8e60-87c620c06fd8",
  type: "page-type/world-class",
  slug: "smuggler",
  title: "Smuggler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
