import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const memorizeHomework = {
  id: "01a0657d-024c-7886-a1f1-643fd13cf292",
  type: "page-type/world-skill",
  slug: "memorize-homework",
  title: "Memorize Homework",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
