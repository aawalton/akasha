import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hummers = {
  id: "01a0657e-01f9-7122-9d86-3b30282c6613",
  type: "page-type/world-class",
  slug: "hummers",
  title: "Hummers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
