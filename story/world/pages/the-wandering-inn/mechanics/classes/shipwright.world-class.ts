import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shipwright = {
  id: "01a0657e-0254-78eb-9569-88422fcfd4e8",
  type: "page-type/world-class",
  slug: "shipwright",
  title: "Shipwright",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
