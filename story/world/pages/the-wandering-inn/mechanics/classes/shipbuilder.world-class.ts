import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shipbuilder = {
  id: "01a0657e-0254-7356-b788-5c19a05ca94a",
  type: "page-type/world-class",
  slug: "shipbuilder",
  title: "Shipbuilder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
