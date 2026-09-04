import type { WorldClass } from "../../world-class.page-type.ts"

export const witch = {
  id: "01a06586-0a7d-76d0-b07c-2a2e02b9565c",
  pageTypeSlug: "world-class",
  slug: "witch",
  title: "Witch",
  worldSlug: "the-wandering-inn",
  aliases: ["WITCH"],
  evolvesToSlugs: ["witch-of-second-chances"],
  references: "jsonl",
} as const satisfies WorldClass
