import type { WorldSkill } from "../../world-skill.page-type.ts"

export const peaceOfTheWild = {
  id: "01a0657d-028e-7050-8db9-6ea8d5446123",
  pageTypeSlug: "world-skill",
  slug: "peace-of-the-wild",
  title: "Peace of the Wild",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["wild-affinity"],
  references: "jsonl",
} as const satisfies WorldSkill
