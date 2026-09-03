import type { WorldClass } from "../../world-class.page-type.ts"

export const leadActress = {
  id: "01a0657e-138d-7c10-99c9-6c1817d63ff4",
  pageTypeSlug: "world-class",
  slug: "lead-actress",
  title: "Lead Actress",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["actress"],
  references: "jsonl",
} as const satisfies WorldClass
