import type { WorldClass } from "../../world-class.page-type.ts"

export const princess = {
  id: "01a06586-0a16-743c-b5bb-40c8cb8fe2b5",
  pageTypeSlug: "world-class",
  slug: "princess",
  title: "Princess",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["worldly-princess"],
  references: "jsonl",
} as const satisfies WorldClass
