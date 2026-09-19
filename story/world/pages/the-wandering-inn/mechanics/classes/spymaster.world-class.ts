import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spymaster = {
  id: "01a0657e-025e-7d61-9bdf-9fb5415f4a95",
  type: "page-type/world-class",
  slug: "spymaster",
  title: "Spymaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
