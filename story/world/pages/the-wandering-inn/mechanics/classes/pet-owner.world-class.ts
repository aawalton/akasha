import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const petOwner = {
  id: "01a06586-0a06-7c8c-b027-95669b22eb27",
  type: "page-type/world-class",
  slug: "pet-owner",
  title: "Pet Owner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
