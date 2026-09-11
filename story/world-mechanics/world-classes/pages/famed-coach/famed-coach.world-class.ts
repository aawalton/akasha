import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const famedCoach = {
  id: "01a0657e-01da-7135-9642-ebb75893ae42",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "famed-coach",
  title: "Famed Coach",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["coach"],
  evolvesToSlugs: ["world-renowned-coach"],
  references: "jsonl",
} as const satisfies WorldClass
