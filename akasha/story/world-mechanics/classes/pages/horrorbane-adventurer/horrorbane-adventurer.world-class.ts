import type { WorldClass } from "../../world-class.page-type.ts"

export const horrorbaneAdventurer = {
  id: "01a0657e-01f9-76cf-9601-63f2791a38e9",
  pageTypeSlug: "world-class",
  slug: "horrorbane-adventurer",
  title: "Horrorbane Adventurer",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["adventurer"],
  references: "jsonl",
} as const satisfies WorldClass
