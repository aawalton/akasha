import type { WorldClass } from "../../world-class.page-type.ts"

export const actress = {
  id: "01a0657e-1325-784f-b619-da63a7e00a97",
  pageTypeSlug: "world-class",
  slug: "actress",
  title: "Actress",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["lead-actress"],
  references: "jsonl",
} as const satisfies WorldClass
