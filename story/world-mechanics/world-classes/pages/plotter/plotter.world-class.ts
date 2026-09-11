import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const plotter = {
  id: "01a06586-0a0a-7277-a41c-38298471a7ec",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "plotter",
  title: "Plotter",
  world: "the-wandering-inn",
  evolvesToSlugs: ["chaos-schemer"],
  references: "jsonl",
} as const satisfies WorldClass
