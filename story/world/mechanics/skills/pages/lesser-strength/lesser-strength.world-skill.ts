import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserStrength = {
  id: "01a06575-9823-745b-a211-dbcd5984ec60",
  type: "page-type/world-skill",
  slug: "lesser-strength",
  title: "Lesser Strength",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["enhanced-strength"],
  references: "jsonl",
} as const satisfies WorldSkill
