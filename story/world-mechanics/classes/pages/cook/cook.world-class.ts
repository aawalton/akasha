import type { WorldClass } from "../../world-class.page-type.ts"

export const cook = {
  id: "01a0657e-134e-7db6-8458-fa279a4b9521",
  pageTypeSlug: "world-class",
  slug: "cook",
  title: "Cook",
  worldSlug: "the-wandering-inn",
  aliases: ["cooks"],
  evolvesToSlugs: ["forager-cook"],
  references: "jsonl",
} as const satisfies WorldClass
