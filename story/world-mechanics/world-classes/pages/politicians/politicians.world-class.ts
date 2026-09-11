import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const politicians = {
  id: "01a0657e-023e-7da8-9234-2ac580aeae85",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "politicians",
  title: "Politicians",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
