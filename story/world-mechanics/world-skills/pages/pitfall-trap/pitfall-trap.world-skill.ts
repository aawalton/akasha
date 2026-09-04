import type { WorldSkill } from "../../world-skill.page-type.ts"

export const pitfallTrap = {
  id: "01a0657d-0295-76d2-909e-34cc6eef1705",
  pageTypeSlug: "world-skill",
  slug: "pitfall-trap",
  title: "Pitfall Trap",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["pit-of-many-deaths"],
  references: "jsonl",
} as const satisfies WorldSkill
