import type { WorldClass } from "../../world-class.page-type.ts"

export const courteousMugger = {
  id: "01a0657e-01cb-7d64-b467-5a12f9cb582e",
  pageTypeSlug: "world-class",
  slug: "courteous-mugger",
  title: "Courteous Mugger",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["courteous-knight"],
  references: "jsonl",
} as const satisfies WorldClass
