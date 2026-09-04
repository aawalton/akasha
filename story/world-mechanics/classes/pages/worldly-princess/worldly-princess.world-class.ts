import type { WorldClass } from "../../world-class.page-type.ts"

export const worldlyPrincess = {
  id: "01a06586-0a84-757d-9e70-828668772da1",
  pageTypeSlug: "world-class",
  slug: "worldly-princess",
  title: "Worldly Princess",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["princess"],
  references: "jsonl",
} as const satisfies WorldClass
