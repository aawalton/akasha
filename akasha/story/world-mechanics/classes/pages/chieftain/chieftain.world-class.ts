import type { WorldClass } from "../../world-class.page-type.ts"

export const chieftain = {
  id: "01a0657e-01c6-7717-875b-16e088a07d18",
  pageTypeSlug: "world-class",
  slug: "chieftain",
  title: "Chieftain",
  worldSlug: "the-wandering-inn",
  aliases: ["chieftains"],
  evolvesFromSlugs: ["leader"],
  references: "jsonl",
} as const satisfies WorldClass
