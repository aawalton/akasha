import type { WorldClass } from "../../world-class.page-type.ts"

export const farmLady = {
  id: "01a0657e-01da-71be-9e05-d63154167ff6",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "farm-lady",
  title: "Farm Lady",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["farmer"],
  references: "jsonl",
} as const satisfies WorldClass
