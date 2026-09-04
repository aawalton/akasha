import type { WorldSkill } from "../../world-skill.page-type.ts"

export const bruteSSwing = {
  id: "01a06575-97f9-7f6c-8749-17292b978ada",
  pageTypeSlug: "world-skill",
  slug: "brute-s-swing",
  title: "Brute’s Swing",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["knight-s-riposte"],
  references: "jsonl",
} as const satisfies WorldSkill
