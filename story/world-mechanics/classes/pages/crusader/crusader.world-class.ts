import type { WorldClass } from "../../world-class.page-type.ts"

export const crusader = {
  id: "01a0657e-1350-707d-b761-3bcf4bd942cf",
  pageTypeSlug: "world-class",
  slug: "crusader",
  title: "Crusader",
  worldSlug: "the-wandering-inn",
  aliases: ["CruSAdeR", "crusaders"],
  evolvesToSlugs: ["templar"],
  references: "jsonl",
} as const satisfies WorldClass
