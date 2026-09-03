import type { WorldSkill } from "../../world-skill.page-type.ts"

export const lesserStrength = {
  id: "01a06575-9823-745b-a211-dbcd5984ec60",
  pageTypeSlug: "world-skill",
  slug: "lesser-strength",
  title: "Lesser Strength",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["enhanced-strength"],
  references: "jsonl",
} as const satisfies WorldSkill
