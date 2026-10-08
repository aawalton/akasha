import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const clandestineSpy = {
  id: "01a0657e-01c6-73ed-9dca-21d579488de9",
  type: "page-type/world-class",
  slug: "clandestine-spy",
  title: "Clandestine Spy",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/spy-of-the-captured-moment"],
  createdAt: "2026-09-03T04:19:11.942Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
