import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const woodcutters = {
  id: "01a06586-0a83-709d-b9a3-bd42f67cd8c9",
  type: "world-class",
  slug: "woodcutters",
  title: "Woodcutters",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
