import type { WorldClass } from "../../world-class.page-type.ts"

export const king = {
  id: "01a0657e-137c-7d7a-b172-202731b2a6cc",
  pageTypeSlug: "world-class",
  slug: "king",
  title: "King",
  worldSlug: "the-wandering-inn",
  aliases: ["kings"],
  evolvesToSlugs: ["king-of-challenges"],
  references: "jsonl",
} as const satisfies WorldClass
