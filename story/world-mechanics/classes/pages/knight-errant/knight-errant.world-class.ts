import type { WorldClass } from "../../world-class.page-type.ts"

export const knightErrant = {
  id: "01a0657e-137c-74ae-ac8a-7bb304bc8199",
  pageTypeSlug: "world-class",
  slug: "knight-errant",
  title: "Knight-Errant",
  worldSlug: "the-wandering-inn",
  aliases: ["Knight Errant", "knight-errants"],
  evolvesToSlugs: ["aura-knight"],
  references: "jsonl",
} as const satisfies WorldClass
