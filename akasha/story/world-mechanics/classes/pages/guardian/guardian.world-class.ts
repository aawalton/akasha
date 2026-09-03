import type { WorldClass } from "../../world-class.page-type.ts"

export const guardian = {
  id: "01a0657e-01e7-78fa-a91f-bac3552e4dd3",
  pageTypeSlug: "world-class",
  slug: "guardian",
  title: "Guardian",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["skeleton-knight"],
  references: "jsonl",
} as const satisfies WorldClass
