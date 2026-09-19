import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chefDePoisson = {
  id: "01a0657e-1348-7d0f-8c5d-b29eaefd3906",
  type: "page-type/world-class",
  slug: "chef-de-poisson",
  title: "Chef de Poisson",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
