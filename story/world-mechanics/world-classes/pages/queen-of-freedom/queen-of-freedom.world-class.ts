import type { WorldClass } from "../../world-class.page-type.ts"

export const queenOfFreedom = {
  id: "01a0657e-0241-7ed7-bc3e-155290a24904",
  pageTypeSlug: "world-class",
  slug: "queen-of-freedom",
  title: "Queen of Freedom",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["antinium-queen"],
  references: "jsonl",
} as const satisfies WorldClass
