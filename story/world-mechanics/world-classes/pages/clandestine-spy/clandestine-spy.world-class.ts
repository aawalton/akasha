import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const clandestineSpy = {
  id: "01a0657e-01c6-73ed-9dca-21d579488de9",
  type: "world-class",
  slug: "clandestine-spy",
  title: "Clandestine Spy",
  world: "the-wandering-inn",
  evolvesToSlugs: ["spy-of-the-captured-moment"],
} as const satisfies WorldClass
