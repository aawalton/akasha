import type { WorldClass } from "../../world-class.page-type.ts"

export const innkeeper = {
  id: "01a0657e-020a-7916-98e1-4f6d6c7407f3",
  pageTypeSlug: "world-class",
  slug: "innkeeper",
  title: "Innkeeper",
  worldSlug: "the-wandering-inn",
  aliases: ["INNKEEPER", "innkeeper", "innkeepers"],
  evolvesToSlugs: ["awesome-innkeeper", "magical-innkeeper"],
  references: "jsonl",
} as const satisfies WorldClass
