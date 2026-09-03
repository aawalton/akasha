import type { WorldClass } from "../../world-class.page-type.ts"

export const veteranScout = {
  id: "01a06586-0a6f-7e80-b32b-4c26c03aa8f2",
  pageTypeSlug: "world-class",
  slug: "veteran-scout",
  title: "Veteran Scout",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["bowman-of-loss"],
  references: "jsonl",
} as const satisfies WorldClass
