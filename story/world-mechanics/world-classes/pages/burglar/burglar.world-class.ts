import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const burglar = {
  id: "01a0657e-01c1-74de-953e-b8022226f5fc",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "burglar",
  title: "Burglar",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
