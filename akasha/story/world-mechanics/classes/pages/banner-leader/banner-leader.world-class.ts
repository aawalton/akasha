import type { WorldClass } from "../../world-class.page-type.ts"

export const bannerLeader = {
  id: "01a0657e-01b0-7f1f-b7fa-d2693ac37fa7",
  pageTypeSlug: "world-class",
  slug: "banner-leader",
  title: "Banner Leader",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["flag-bearer"],
  references: "jsonl",
} as const satisfies WorldClass
