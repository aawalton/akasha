import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const grocers = {
  id: "01a0657e-01e5-7dcd-a70f-85c108004f9a",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "grocers",
  title: "Grocers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
