import type { WorldClass } from "../../world-class.page-type.ts"

export const chieftainOfTheMaw = {
  id: "01a0657e-01c5-7a03-9ec9-6b017ed60a4c",
  pageTypeSlug: "world-class",
  slug: "chieftain-of-the-maw",
  title: "Chieftain of the Maw",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["goblin-chieftain"],
  references: "jsonl",
} as const satisfies WorldClass
