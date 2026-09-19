import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const copySkillTransferMomentum = {
  id: "01a06575-97fe-7925-8481-38568f135333",
  type: "page-type/world-skill",
  slug: "copy-skill-transfer-momentum",
  title: "Copy Skill: Transfer Momentum",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
