import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hugeChomp = {
  id: "01a06575-981b-7329-bf93-d934fd79e599",
  type: "page-type/world-skill",
  slug: "huge-chomp",
  title: "Huge Chomp",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["yawning-bite"],
} as const satisfies WorldSkill
