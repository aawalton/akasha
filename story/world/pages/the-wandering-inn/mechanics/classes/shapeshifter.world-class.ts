import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shapeshifter = {
  id: "01a06586-0a39-7495-b24f-db8e838c45cc",
  type: "page-type/world-class",
  slug: "shapeshifter",
  title: "Shapeshifter",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
