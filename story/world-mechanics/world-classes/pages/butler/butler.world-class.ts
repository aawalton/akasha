import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const butler = {
  id: "01a0657e-1342-7e3d-82f4-c618f314d9e8",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "butler",
  title: "Butler",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
