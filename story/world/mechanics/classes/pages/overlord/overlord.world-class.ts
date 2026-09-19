import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const overlord = {
  id: "01a0657e-13b4-734f-82cf-cdeb0010dff4",
  type: "page-type/world-class",
  slug: "overlord",
  title: "Overlord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
