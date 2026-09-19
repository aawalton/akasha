import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const copySkillTenLevels = {
  id: "01a06575-97fe-7c20-956b-eea36b131664",
  type: "page-type/world-skill",
  slug: "copy-skill-ten-levels",
  title: "Copy Skill: Ten Levels",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
