import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const archLeap = {
  id: "01a06575-97ec-7c00-b32b-dd5cf834077c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "arch-leap",
  title: "Arch Leap",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
