import type { WorldClass } from "../../world-class.page-type.ts"

export const honestReporter = {
  id: "01a0657e-01f9-73fa-a6dc-f54fb7717760",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "honest-reporter",
  title: "Honest Reporter",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["gossip"],
  references: "jsonl",
} as const satisfies WorldClass
