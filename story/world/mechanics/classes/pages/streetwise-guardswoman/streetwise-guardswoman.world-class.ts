import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const streetwiseGuardswoman = {
  id: "01a06586-0a5d-731b-9b4f-a68626551cd4",
  type: "page-type/world-class",
  slug: "streetwise-guardswoman",
  title: "Streetwise Guardswoman",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["smokebreath-detective"],
  references: "jsonl",
} as const satisfies WorldClass
