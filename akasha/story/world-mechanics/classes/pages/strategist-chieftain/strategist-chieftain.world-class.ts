import type { WorldClass } from "../../world-class.page-type.ts"

export const strategistChieftain = {
  id: "01a06586-0a56-7679-acd1-83efbb32b5f1",
  pageTypeSlug: "world-class",
  slug: "strategist-chieftain",
  title: "Strategist Chieftain",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["strategist-chieftain-of-reclamation"],
  references: "jsonl",
} as const satisfies WorldClass
