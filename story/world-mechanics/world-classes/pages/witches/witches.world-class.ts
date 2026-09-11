import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const witches = {
  id: "01a06586-0a82-78cf-8cae-a42ae512dad1",
  type: "world-class",
  slug: "witches",
  title: "Witches",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
