import type { WorldClass } from "../../world-class.page-type.ts"

export const courteousKnight = {
  id: "01a0657e-134f-7dc4-aa0e-8c64dc5f413d",
  pageTypeSlug: "world-class",
  slug: "courteous-knight",
  title: "Courteous Knight",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["courteous-mugger"],
  evolvesToSlugs: ["knight-of-honor-s-ember"],
  references: "jsonl",
} as const satisfies WorldClass
