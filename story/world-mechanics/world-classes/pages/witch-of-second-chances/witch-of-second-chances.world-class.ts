import type { WorldClass } from "../../world-class.page-type.ts"

export const witchOfSecondChances = {
  id: "01a06586-0a77-774b-bb8e-c373f1dc4012",
  pageTypeSlug: "world-class",
  slug: "witch-of-second-chances",
  title: "Witch of Second Chances",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["witch"],
  references: "jsonl",
} as const satisfies WorldClass
