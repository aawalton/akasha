import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const extendSkill = {
  id: "01a06575-980a-7dd7-909c-98169a7808ca",
  type: "world-skill",
  slug: "extend-skill",
  title: "Extend Skill",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
