import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const falseSmile = {
  id: "01a06575-980b-7fa4-8d18-c1a3d55ba552",
  type: "page-type/world-skill",
  slug: "false-smile",
  title: "False Smile",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
