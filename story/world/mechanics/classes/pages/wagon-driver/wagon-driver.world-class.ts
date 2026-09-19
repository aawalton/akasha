import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wagonDriver = {
  id: "01a06586-0a70-719e-aa80-4180d4431f96",
  type: "page-type/world-class",
  slug: "wagon-driver",
  title: "Wagon Driver",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
