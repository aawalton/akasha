import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sailingAdmiral = {
  id: "01a06586-0a28-744c-bc7b-2001f8da2dce",
  type: "world-class",
  slug: "sailing-admiral",
  title: "Sailing Admiral",
  world: "the-wandering-inn",
  evolvesToSlugs: ["intractable-admiral-of-sacrifice"],
} as const satisfies WorldClass
