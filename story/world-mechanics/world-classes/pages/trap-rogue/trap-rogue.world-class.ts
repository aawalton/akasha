import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const trapRogue = {
  id: "01a06586-0a6b-7912-9cfc-432599fd7bc3",
  type: "world-class",
  slug: "trap-rogue",
  title: "Trap Rogue",
  world: "the-wandering-inn",
  evolvesToSlugs: ["pitfall-trapmaster-saboteur"],
} as const satisfies WorldClass
