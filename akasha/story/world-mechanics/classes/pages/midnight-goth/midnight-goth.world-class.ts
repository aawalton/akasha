import type { WorldClass } from "../../world-class.page-type.ts"

export const midnightGoth = {
  id: "01a0657e-13a2-7620-987d-e0fadd517e5d",
  pageTypeSlug: "world-class",
  slug: "midnight-goth",
  title: "Midnight Goth",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["goth"],
  references: "jsonl",
} as const satisfies WorldClass
