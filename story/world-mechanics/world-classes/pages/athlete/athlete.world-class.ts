import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const athlete = {
  id: "01a0657e-01ae-764f-9dcb-4ea8e23cfebe",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "athlete",
  title: "Athlete",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
