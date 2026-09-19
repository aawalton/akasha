import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const disarmingStrike = {
  id: "01a06575-9804-7356-849c-08527cd191ca",
  type: "page-type/world-skill",
  slug: "disarming-strike",
  title: "Disarming Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
