import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const autocasting = {
  id: "01a06575-97f0-7d14-b0ff-b35a72ca43be",
  type: "page-type/world-skill",
  slug: "autocasting",
  title: "Autocasting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
