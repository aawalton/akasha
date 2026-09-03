import type { WorldClass } from "../world-class.page-type.ts"

export const clandestineSpy = {
  id: "01a0657e-01c6-73ed-9dca-21d579488de9",
  pageTypeSlug: "world-class",
  slug: "clandestine-spy",
  title: "Clandestine Spy",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["spy-of-the-captured-moment"],
} as const satisfies WorldClass
