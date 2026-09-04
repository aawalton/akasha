import type { WorldClass } from "../../world-class.page-type.ts"

export const companyCommander = {
  id: "01a0657e-01c9-7e43-a6ca-cccfe391a318",
  pageTypeSlug: "world-class",
  slug: "company-commander",
  title: "Company Commander",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["mercenary"],
  references: "jsonl",
} as const satisfies WorldClass
