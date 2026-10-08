import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserStrength = {
  id: "01a06575-9823-745b-a211-dbcd5984ec60",
  type: "page-type/world-skill",
  slug: "lesser-strength",
  title: "Lesser Strength",
  world: "world/the-wandering-inn",
  appearanceCount: 48,
  evolvesToSlugs: ["world-skill/enhanced-strength"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.611Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
