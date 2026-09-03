import type { WorldClass } from "../../world-class.page-type.ts"

export const mercenary = {
  id: "01a0657e-13a0-757c-a347-97f1f26d72f8",
  pageTypeSlug: "world-class",
  slug: "mercenary",
  title: "Mercenary",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["company-commander"],
  references: "jsonl",
} as const satisfies WorldClass
