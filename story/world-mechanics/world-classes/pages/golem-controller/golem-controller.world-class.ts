import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const golemController = {
  id: "01a0657e-01e3-7c3d-9a9f-254b7db5763b",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "golem-controller",
  title: "Golem Controller",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
