import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const companyCommander = {
  id: "01a0657e-01c9-7e43-a6ca-cccfe391a318",
  type: "page-type/world-class",
  slug: "company-commander",
  title: "Company Commander",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["mercenary"],
  references: "jsonl",
} as const satisfies WorldClass
