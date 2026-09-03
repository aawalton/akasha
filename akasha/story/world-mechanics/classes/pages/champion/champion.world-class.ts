import type { WorldClass } from "../../world-class.page-type.ts"

export const champion = {
  id: "01a0657e-01c3-71ab-af28-7b7ab4d56b1f",
  pageTypeSlug: "world-class",
  slug: "champion",
  title: "Champion",
  worldSlug: "the-wandering-inn",
  aliases: ["champions"],
  evolvesFromSlugs: ["warrior"],
  references: "jsonl",
} as const satisfies WorldClass
