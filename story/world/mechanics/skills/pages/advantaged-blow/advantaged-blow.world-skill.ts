import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advantagedBlow = {
  id: "01a06575-97e9-76a7-b0e0-66a84e8d5750",
  type: "page-type/world-skill",
  slug: "advantaged-blow",
  title: "Advantaged Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
