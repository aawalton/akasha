import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const curseBadLuck = {
  id: "01a06575-97ff-73a6-aaa6-87525be662c8",
  type: "page-type/world-skill",
  slug: "curse-bad-luck",
  title: "Curse: Bad Luck",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
