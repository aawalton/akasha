import type { WorldClass } from "../../world-class.page-type.ts"

export const greenMage = {
  id: "01a0657e-136e-710e-92fe-bdda389179c3",
  pageTypeSlug: "world-class",
  slug: "green-mage",
  title: "Green Mage",
  worldSlug: "the-wandering-inn",
  aliases: ["green-mages"],
  evolvesToSlugs: ["bloodearth-mage"],
  references: "jsonl",
} as const satisfies WorldClass
