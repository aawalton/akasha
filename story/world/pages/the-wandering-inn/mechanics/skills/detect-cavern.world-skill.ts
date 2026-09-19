import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectCavern = {
  id: "01a06575-9803-700a-8980-e942f835fbf7",
  type: "page-type/world-skill",
  slug: "detect-cavern",
  title: "Detect Cavern",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
