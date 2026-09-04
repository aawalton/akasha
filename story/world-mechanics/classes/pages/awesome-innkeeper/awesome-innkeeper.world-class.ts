import type { WorldClass } from "../../world-class.page-type.ts"

export const awesomeInnkeeper = {
  id: "01a0657e-1336-7515-87f5-d8b5c8c77b50",
  pageTypeSlug: "world-class",
  slug: "awesome-innkeeper",
  title: "Awesome Innkeeper",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["innkeeper"],
  references: "jsonl",
} as const satisfies WorldClass
