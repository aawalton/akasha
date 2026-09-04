import type { WorldClass } from "../../world-class.page-type.ts"

export const fireMage = {
  id: "01a0657e-1364-7400-b0b9-d698ab894aec",
  pageTypeSlug: "world-class",
  slug: "fire-mage",
  title: "Fire Mage",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["inferno-mage"],
  references: "jsonl",
} as const satisfies WorldClass
