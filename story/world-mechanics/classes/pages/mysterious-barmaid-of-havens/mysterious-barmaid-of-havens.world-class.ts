import type { WorldClass } from "../../world-class.page-type.ts"

export const mysteriousBarmaidOfHavens = {
  id: "01a0657e-0234-7248-a172-0f825d98bc5b",
  pageTypeSlug: "world-class",
  slug: "mysterious-barmaid-of-havens",
  title: "Mysterious Barmaid of Havens",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["boxhead-barmaid"],
  references: "jsonl",
} as const satisfies WorldClass
