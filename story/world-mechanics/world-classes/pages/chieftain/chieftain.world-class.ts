import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const chieftain = {
  id: "01a0657e-01c6-7717-875b-16e088a07d18",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "chieftain",
  title: "Chieftain",
  world: "the-wandering-inn",
  aliases: ["chieftains"],
  evolvesFromSlugs: ["leader"],
  references: "jsonl",
} as const satisfies WorldClass
