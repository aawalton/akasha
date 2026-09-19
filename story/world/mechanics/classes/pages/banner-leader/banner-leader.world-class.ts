import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bannerLeader = {
  id: "01a0657e-01b0-7f1f-b7fa-d2693ac37fa7",
  type: "page-type/world-class",
  slug: "banner-leader",
  title: "Banner Leader",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["flag-bearer"],
  references: "jsonl",
} as const satisfies WorldClass
