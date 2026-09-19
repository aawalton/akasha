import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stormSailor = {
  id: "01a0657e-0260-7dac-9a47-a23fafc40909",
  type: "page-type/world-class",
  slug: "storm-sailor",
  title: "Storm Sailor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
