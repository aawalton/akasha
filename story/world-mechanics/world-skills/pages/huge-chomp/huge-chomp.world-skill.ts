import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hugeChomp = {
  id: "01a06575-981b-7329-bf93-d934fd79e599",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "huge-chomp",
  title: "Huge Chomp",
  world: "the-wandering-inn",
  evolvesToSlugs: ["yawning-bite"],
} as const satisfies WorldSkill
