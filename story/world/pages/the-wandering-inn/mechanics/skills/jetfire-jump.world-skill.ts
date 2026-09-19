import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const jetfireJump = {
  id: "01a06575-9820-71e8-a435-e6fc1e4115c9",
  type: "page-type/world-skill",
  slug: "jetfire-jump",
  title: "Jetfire Jump",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
