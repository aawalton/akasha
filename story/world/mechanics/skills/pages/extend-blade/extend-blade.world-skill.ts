import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const extendBlade = {
  id: "01a06575-980a-7f28-9736-e7e2ec2ebc88",
  type: "page-type/world-skill",
  slug: "extend-blade",
  title: "Extend Blade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
