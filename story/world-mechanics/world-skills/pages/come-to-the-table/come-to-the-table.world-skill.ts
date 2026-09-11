import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const comeToTheTable = {
  id: "01a06575-97fc-7816-99ff-a9e154382a2f",
  type: "world-skill",
  slug: "come-to-the-table",
  title: "Come to the Table",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
