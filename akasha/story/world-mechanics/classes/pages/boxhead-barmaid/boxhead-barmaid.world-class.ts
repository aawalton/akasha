import type { WorldClass } from "../../world-class.page-type.ts"

export const boxheadBarmaid = {
  id: "01a0657e-01c0-751e-a915-387afcfff64f",
  pageTypeSlug: "world-class",
  slug: "boxhead-barmaid",
  title: "Boxhead Barmaid",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["barmaid"],
  evolvesToSlugs: ["mysterious-barmaid-of-havens"],
  references: "jsonl",
} as const satisfies WorldClass
