import type { WorldClass } from "../../world-class.page-type.ts"

export const headstrongHealer = {
  id: "01a0657e-1371-7540-a5dd-0359efbf129e",
  pageTypeSlug: "world-class",
  slug: "headstrong-healer",
  title: "Headstrong Healer",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["healer"],
  references: "jsonl",
} as const satisfies WorldClass
