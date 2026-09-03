import type { WorldSkill } from "../../world-skill.page-type.ts"

export const pitOfManyDeaths = {
  id: "01a0657d-0295-791a-abd7-2719fcf632f3",
  pageTypeSlug: "world-skill",
  slug: "pit-of-many-deaths",
  title: "Pit of Many Deaths",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["pitfall-trap"],
  references: "jsonl",
} as const satisfies WorldSkill
