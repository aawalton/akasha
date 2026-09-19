import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const orchardTender = {
  id: "01a0657e-0235-7c8c-bbc0-1d9a73e3c33d",
  type: "page-type/world-class",
  slug: "orchard-tender",
  title: "Orchard Tender",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
