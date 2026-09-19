import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eachDeathAnotherBreath = {
  id: "01a06575-9806-7f95-bfaa-80e97cac8901",
  type: "page-type/world-skill",
  slug: "each-death-another-breath",
  title: "Each Death, Another Breath",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
