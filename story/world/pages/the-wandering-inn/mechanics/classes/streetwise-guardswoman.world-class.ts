import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const streetwiseGuardswoman = {
  id: "01a06586-0a5d-731b-9b4f-a68626551cd4",
  type: "page-type/world-class",
  slug: "streetwise-guardswoman",
  title: "Streetwise Guardswoman",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-class/smokebreath-detective"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.429Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
