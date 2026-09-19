import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const archLeap = {
  id: "01a06575-97ec-7c00-b32b-dd5cf834077c",
  type: "page-type/world-skill",
  slug: "arch-leap",
  title: "Arch Leap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
