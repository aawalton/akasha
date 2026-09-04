import type { WorldClass } from "../../world-class.page-type.ts"

export const goblinSoulbard = {
  id: "01a0657e-01e2-7ffb-9d79-01643ec6bab2",
  pageTypeSlug: "world-class",
  slug: "goblin-soulbard",
  title: "Goblin Soulbard",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["bard"],
  references: "jsonl",
} as const satisfies WorldClass
