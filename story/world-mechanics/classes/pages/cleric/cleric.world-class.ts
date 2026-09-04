import type { WorldClass } from "../../world-class.page-type.ts"

export const cleric = {
  id: "01a0657e-134a-7e0e-8ed4-6c5db4137b49",
  pageTypeSlug: "world-class",
  slug: "cleric",
  title: "Cleric",
  worldSlug: "the-wandering-inn",
  aliases: ["clerics"],
  evolvesFromSlugs: ["acolyte"],
  references: "jsonl",
} as const satisfies WorldClass
