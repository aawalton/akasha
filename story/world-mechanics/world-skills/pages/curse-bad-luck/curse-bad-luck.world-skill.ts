import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const curseBadLuck = {
  id: "01a06575-97ff-73a6-aaa6-87525be662c8",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "curse-bad-luck",
  title: "Curse: Bad Luck",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
