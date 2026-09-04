import type { WorldClass } from "../../world-class.page-type.ts"

export const chaosSchemer = {
  id: "01a0657e-01c4-7374-93a6-2e1d3a850671",
  pageTypeSlug: "world-class",
  slug: "chaos-schemer",
  title: "Chaos Schemer",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["plotter"],
  references: "jsonl",
} as const satisfies WorldClass
