import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const antiniumExpertiseCommand = {
  id: "01a06575-97eb-7b88-9fea-793091c70fe3",
  type: "page-type/world-skill",
  slug: "antinium-expertise-command",
  title: "Antinium-Expertise Command",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
