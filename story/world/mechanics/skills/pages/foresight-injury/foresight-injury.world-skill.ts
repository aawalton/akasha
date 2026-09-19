import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const foresightInjury = {
  id: "01a06575-9810-7a05-90a7-9013207e4c17",
  type: "page-type/world-skill",
  slug: "foresight-injury",
  title: "Foresight: Injury",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
