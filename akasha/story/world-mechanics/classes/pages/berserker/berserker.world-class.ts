import type { WorldClass } from "../../world-class.page-type.ts"

export const berserker = {
  id: "01a0657e-133e-77f7-ba43-04e2ab7bf3cb",
  pageTypeSlug: "world-class",
  slug: "berserker",
  title: "Berserker",
  worldSlug: "the-wandering-inn",
  aliases: ["berserkers"],
  evolvesFromSlugs: ["warrior"],
  references: "jsonl",
} as const satisfies WorldClass
