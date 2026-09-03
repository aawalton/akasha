import type { WorldClass } from "../../world-class.page-type.ts"

export const foreignCommander = {
  id: "01a0657e-1366-7eb7-98f2-d71a3c6f531f",
  pageTypeSlug: "world-class",
  slug: "foreign-commander",
  title: "Foreign Commander",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["combined-arms-commander"],
  references: "jsonl",
} as const satisfies WorldClass
