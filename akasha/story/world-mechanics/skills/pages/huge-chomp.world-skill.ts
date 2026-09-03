import type { WorldSkill } from "../world-skill.page-type.ts"

export const hugeChomp = {
  id: "01a06575-981b-7329-bf93-d934fd79e599",
  pageTypeSlug: "world-skill",
  slug: "huge-chomp",
  title: "Huge Chomp",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["yawning-bite"],
} as const satisfies WorldSkill
