import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicSynthesis = {
  id: "01a06575-97f4-7517-8374-0f9014d03846",
  type: "page-type/world-skill",
  slug: "basic-synthesis",
  title: "Basic Synthesis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
