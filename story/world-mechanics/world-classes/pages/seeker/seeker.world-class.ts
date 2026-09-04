import type { WorldClass } from "../../world-class.page-type.ts"

export const seeker = {
  id: "01a0657e-024c-74b3-90dd-585461047d39",
  pageTypeSlug: "world-class",
  slug: "seeker",
  title: "Seeker",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["djinn-s-legacy-seeker"],
  references: "jsonl",
} as const satisfies WorldClass
