import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectInjury = {
  id: "01a06575-9803-7274-9fd6-e6e95ccbc706",
  type: "page-type/world-skill",
  slug: "detect-injury",
  title: "Detect Injury",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
