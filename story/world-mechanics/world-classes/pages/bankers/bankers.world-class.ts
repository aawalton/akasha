import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bankers = {
  id: "01a0657e-01b0-7c8f-b3a5-f90101b885bc",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "bankers",
  title: "Bankers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
