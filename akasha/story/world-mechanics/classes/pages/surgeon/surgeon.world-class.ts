import type { WorldClass } from "../../world-class.page-type.ts"

export const surgeon = {
  id: "01a06586-0a60-73b3-a2c5-31478a60f66f",
  pageTypeSlug: "world-class",
  slug: "surgeon",
  title: "Surgeon",
  worldSlug: "the-wandering-inn",
  aliases: ["surgeons"],
  evolvesToSlugs: ["psychic-surgeon"],
  references: "jsonl",
} as const satisfies WorldClass
