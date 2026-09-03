import type { WorldClass } from "../../world-class.page-type.ts"

export const acolyte = {
  id: "01a0657e-1324-78c5-9fad-64f4d6603ed4",
  pageTypeSlug: "world-class",
  slug: "acolyte",
  title: "Acolyte",
  worldSlug: "the-wandering-inn",
  aliases: ["acolytes"],
  evolvesToSlugs: ["cleric"],
  references: "jsonl",
} as const satisfies WorldClass
