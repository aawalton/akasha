import type { WorldClass } from "../../world-class.page-type.ts"

export const queen = {
  id: "01a0657e-0243-7445-92f8-52964a60fa18",
  pageTypeSlug: "world-class",
  slug: "queen",
  title: "Queen",
  worldSlug: "the-wandering-inn",
  aliases: ["queens"],
  evolvesToSlugs: ["antinium-queen"],
  references: "jsonl",
} as const satisfies WorldClass
