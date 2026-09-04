import type { WorldClass } from "../../world-class.page-type.ts"

export const leader = {
  id: "01a0657e-138d-71d5-a5c5-c98581a1269a",
  pageTypeSlug: "world-class",
  slug: "leader",
  title: "Leader",
  worldSlug: "the-wandering-inn",
  aliases: ["leaders"],
  evolvesToSlugs: ["chieftain"],
  references: "jsonl",
} as const satisfies WorldClass
