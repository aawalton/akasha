import type { WorldClass } from "../../world-class.page-type.ts"

export const antFarmer = {
  id: "01a0657e-132c-7e9a-9808-1972c5c7719f",
  pageTypeSlug: "world-class",
  slug: "ant-farmer",
  title: "Ant Farmer",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["bug-collector"],
  references: "jsonl",
} as const satisfies WorldClass
