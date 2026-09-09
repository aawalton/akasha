import type { WorldSkill } from "../../world-skill.page-type.ts"

export const wildAffinity = {
  id: "01a0657d-032e-70c7-a238-309eb38e8f23",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "wild-affinity",
  title: "Wild Affinity",
  world: "the-wandering-inn",
  evolvesToSlugs: ["peace-of-the-wild"],
  references: "jsonl",
} as const satisfies WorldSkill
