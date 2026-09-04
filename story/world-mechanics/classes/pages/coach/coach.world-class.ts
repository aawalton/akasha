import type { WorldClass } from "../../world-class.page-type.ts"

export const coach = {
  id: "01a0657e-134b-79ab-a16e-b45c38b894cd",
  pageTypeSlug: "world-class",
  slug: "coach",
  title: "Coach",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["famed-coach"],
  references: "jsonl",
} as const satisfies WorldClass
