import type { WorldClass } from "../../world-class.page-type.ts"

export const goth = {
  id: "01a0657e-01e3-79f1-ad61-529c6c348141",
  pageTypeSlug: "world-class",
  slug: "goth",
  title: "Goth",
  worldSlug: "the-wandering-inn",
  aliases: ["goths"],
  evolvesToSlugs: ["midnight-goth"],
  references: "jsonl",
} as const satisfies WorldClass
