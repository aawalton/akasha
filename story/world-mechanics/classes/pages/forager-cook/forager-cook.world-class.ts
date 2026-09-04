import type { WorldClass } from "../../world-class.page-type.ts"

export const foragerCook = {
  id: "01a0657e-01de-76de-8c90-74b164e3604a",
  pageTypeSlug: "world-class",
  slug: "forager-cook",
  title: "Forager Cook",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["cook"],
  references: "jsonl",
} as const satisfies WorldClass
