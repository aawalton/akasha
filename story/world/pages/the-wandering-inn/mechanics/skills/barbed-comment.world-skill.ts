import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barbedComment = {
  id: "01a06575-97f3-710b-9520-ae48ffc31b1e",
  type: "page-type/world-skill",
  slug: "barbed-comment",
  title: "Barbed Comment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
