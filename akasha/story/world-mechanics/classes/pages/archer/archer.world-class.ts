import type { WorldClass } from "../../world-class.page-type.ts"

export const archer = {
  id: "01a0657e-132e-7148-aec3-ee811a9dea78",
  pageTypeSlug: "world-class",
  slug: "archer",
  title: "Archer",
  worldSlug: "the-wandering-inn",
  aliases: ["archers"],
  evolvesToSlugs: ["sniper"],
  references: "jsonl",
} as const satisfies WorldClass
