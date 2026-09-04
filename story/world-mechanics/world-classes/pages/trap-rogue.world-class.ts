import type { WorldClass } from "../world-class.page-type.ts"

export const trapRogue = {
  id: "01a06586-0a6b-7912-9cfc-432599fd7bc3",
  pageTypeSlug: "world-class",
  slug: "trap-rogue",
  title: "Trap Rogue",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["pitfall-trapmaster-saboteur"],
} as const satisfies WorldClass
