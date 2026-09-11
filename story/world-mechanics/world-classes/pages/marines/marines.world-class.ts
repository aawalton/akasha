import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const marines = {
  id: "01a0657e-139d-7105-aad6-1027a71498b2",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "marines",
  title: "Marines",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
