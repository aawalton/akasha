import type { WorldClass } from "../../world-class.page-type.ts"

export const queenTemporary = {
  id: "01a06586-0a1a-7787-8fee-36448ccc8bac",
  pageTypeSlug: "world-class",
  slug: "queen-temporary",
  title: "Queen (Temporary)",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["duelist-princess"],
  references: "jsonl",
} as const satisfies WorldClass
