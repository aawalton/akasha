import type { WorldClass } from "../../world-class.page-type.ts"

export const mage = {
  id: "01a0657e-0229-758f-aed9-d8cb28e4f932",
  pageTypeSlug: "world-class",
  slug: "mage",
  title: "Mage",
  worldSlug: "the-wandering-inn",
  aliases: ["mages"],
  evolvesToSlugs: ["druid"],
  references: "jsonl",
} as const satisfies WorldClass
