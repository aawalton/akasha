import type { WorldClass } from "../../world-class.page-type.ts"

export const psychicSurgeon = {
  id: "01a0657e-0240-774e-937a-107c084d077c",
  pageTypeSlug: "world-class",
  slug: "psychic-surgeon",
  title: "Psychic Surgeon",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["surgeon"],
  references: "jsonl",
} as const satisfies WorldClass
