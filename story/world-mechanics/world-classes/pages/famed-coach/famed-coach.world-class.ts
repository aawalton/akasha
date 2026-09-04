import type { WorldClass } from "../../world-class.page-type.ts"

export const famedCoach = {
  id: "01a0657e-01da-7135-9642-ebb75893ae42",
  pageTypeSlug: "world-class",
  slug: "famed-coach",
  title: "Famed Coach",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["coach"],
  evolvesToSlugs: ["world-renowned-coach"],
  references: "jsonl",
} as const satisfies WorldClass
