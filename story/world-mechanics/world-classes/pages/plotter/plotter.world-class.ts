import type { WorldClass } from "../../world-class.page-type.ts"

export const plotter = {
  id: "01a06586-0a0a-7277-a41c-38298471a7ec",
  pageTypeSlug: "world-class",
  slug: "plotter",
  title: "Plotter",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["chaos-schemer"],
  references: "jsonl",
} as const satisfies WorldClass
