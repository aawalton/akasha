import type { WorldSkill } from "../../world-skill.page-type.ts"

export const basicCooking = {
  id: "01a06575-97f3-701a-a96e-7a82e6472a21",
  pageTypeSlug: "world-skill",
  slug: "basic-cooking",
  title: "Basic Cooking",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["seafood-cooking"],
  references: "jsonl",
} as const satisfies WorldSkill
