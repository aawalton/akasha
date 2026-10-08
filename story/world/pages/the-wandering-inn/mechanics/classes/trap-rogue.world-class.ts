import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const trapRogue = {
  id: "01a06586-0a6b-7912-9cfc-432599fd7bc3",
  type: "page-type/world-class",
  slug: "trap-rogue",
  title: "Trap Rogue",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/pitfall-trapmaster-saboteur"],
  createdAt: "2026-09-03T04:27:58.443Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
