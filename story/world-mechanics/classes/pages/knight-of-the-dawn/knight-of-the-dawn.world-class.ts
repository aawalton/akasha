import type { WorldClass } from "../../world-class.page-type.ts"

export const knightOfTheDawn = {
  id: "01a0657e-137d-746a-abc0-ca39696cacf1",
  pageTypeSlug: "world-class",
  slug: "knight-of-the-dawn",
  title: "Knight of the Dawn",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["aura-knight"],
  references: "jsonl",
} as const satisfies WorldClass
