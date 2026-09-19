import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const homingKick = {
  id: "01a06575-981a-72bb-82f3-a242e20ab090",
  type: "page-type/world-skill",
  slug: "homing-kick",
  title: "Homing Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
