import type { WorldClass } from "../../world-class.page-type.ts"

export const farmer = {
  id: "01a0657e-1363-7e2d-82d8-1d438b6c5dad",
  pageTypeSlug: "world-class",
  slug: "farmer",
  title: "Farmer",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["farm-lady"],
  references: "jsonl",
} as const satisfies WorldClass
