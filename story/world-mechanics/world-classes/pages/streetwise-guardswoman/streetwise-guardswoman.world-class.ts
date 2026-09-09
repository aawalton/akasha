import type { WorldClass } from "../../world-class.page-type.ts"

export const streetwiseGuardswoman = {
  id: "01a06586-0a5d-731b-9b4f-a68626551cd4",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "streetwise-guardswoman",
  title: "Streetwise Guardswoman",
  world: "the-wandering-inn",
  evolvesToSlugs: ["smokebreath-detective"],
  references: "jsonl",
} as const satisfies WorldClass
