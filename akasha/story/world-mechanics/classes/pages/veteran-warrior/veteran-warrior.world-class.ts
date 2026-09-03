import type { WorldClass } from "../../world-class.page-type.ts"

export const veteranWarrior = {
  id: "01a0657e-026e-71e9-af9f-4da88ecd07fb",
  pageTypeSlug: "world-class",
  slug: "veteran-warrior",
  title: "Veteran Warrior",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["exemplar-warrior"],
  references: "jsonl",
} as const satisfies WorldClass
