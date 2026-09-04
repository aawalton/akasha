import type { WorldSkill } from "../../world-skill.page-type.ts"

export const seafoodCooking = {
  id: "01a0657d-02b8-74a4-aeb6-228791da209c",
  pageTypeSlug: "world-skill",
  slug: "seafood-cooking",
  title: "Seafood Cooking",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["basic-cooking"],
  references: "jsonl",
} as const satisfies WorldSkill
