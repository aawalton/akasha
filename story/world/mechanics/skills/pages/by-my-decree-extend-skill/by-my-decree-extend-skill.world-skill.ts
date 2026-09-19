import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const byMyDecreeExtendSkill = {
  id: "01a06575-97f9-70ea-b6e6-aa500f99b3d0",
  type: "page-type/world-skill",
  slug: "by-my-decree-extend-skill",
  title: "By My Decree: Extend Skill",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
